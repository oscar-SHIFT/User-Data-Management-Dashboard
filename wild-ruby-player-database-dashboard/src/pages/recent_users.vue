<template>
  <div class="q-pa-md">
    <q-btn-toggle
      class="col-auto"
      v-model="selectedBaseURL"
      @input= 'changeBaseURL'
      toggle-color="primary"
      :options="[
        {label: 'Prod', value: 'prod'},
        {label: 'Test', value: 'test'},
      ]"/>
    <br><br>
    <q-form @submit="datePicked" class="row q-col-gutter-x-md">           
      <q-input filled v-model="fromDate" mask="date" :rules="['date', val => new Date (val) <= new Date().getTime   () || 'Input must be before current date']" label="From" stack-label class="col-6 col-md-4"> 
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qFromDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="fromDate" @input="() => $refs.qFromDateProxy.hide()"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      
      <q-input filled v-model="toDate" mask="date" :rules="[ 'date',
        val => new Date (val) <= new Date().getTime() || 'Input must be before todays date']"
        label="To" stack-label class="col-6 col-md-4" bottom-slots> 
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qToDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="toDate" @input="() => $refs.qFromDateProxy.hide()"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div>
        <q-btn label="Search" type="submit" color="primary" class="col-6 col-md-4-self-end "/>
      </div>
      <p>This table only shows users with a 'Date created' value </p>
    </q-form>
    <br>
    <q-table
      title="User Data"
      :data="recentPlayers"
      :columns="columns"
      row-key="email"
      :pagination.sync="pagination"
      loading: false
      :filter="filter"
    >
      <template class="row justify-end" v-slot:top>
        <q-space></q-space>
        <q-input class="col-auto"  dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<style>
</style>

<script>

import Vue from 'vue'
import axios from 'axios'
import { date } from 'quasar'
import { store } from "../store/store.ts";

//Check what environment if not test use production baseURL, which is substituted into calls
let baseURL =
  store.state.deployConfig.environment === "production"
    ? "https://wrc-database.cashedarcade.com"
    : "https://wrc-database.test.cashedarcade.com";

const instance = axios.create({
headers: { 'Content-Type': 'application/json' },
})

export default Vue.extend ({
  name: 'PageIndex',

  data () {
    return {
      filter: "",
      pagination: {
        sortBy: 'date',
        descending: true,
        page: 1,
        rowsPerPage: 10,
      },
      columns: [
        {
          name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true
        },
        {
          name: 'ID', required: true, label: 'bspotId', align: 'center', field: 'bspotId', sortable: true
        },
        {
          name: "ADW", required: true, label: "ADW status", align: "center", field: "adwStatus", sortable: true
        },
        {
          name: 'date', required: true, label: 'Date created', align: 'center', field: 'dateOfCreation', sortable: true, format: (dateOfCreation) => date.formatDate(dateOfCreation, 'DD-MM-YYYY')
        }
      ],

      recentPlayers: [],

      //these variables will change depending on the date picked in date picker
      fromDate: '',
      toDate: '',
      currentDate: '',
      selectedBaseURL: ''
    }
  },

  created () {
    //GET ALL PLAYERS ADDED IN LAST MONTH 
    //AND set date range values 
    this.loading = true
    var dateOneMonthAgo = new Date();
    dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() - 30);

    let TSdateOneMonthAgo = dateOneMonthAgo.valueOf()

    instance.post(`${baseURL}/getPlayersSinceDate`, {date: TSdateOneMonthAgo})
      .then((response) => {
        this.recentPlayers = response.data
      })
      .catch(function (error) {
        console.log(error);
      });

    //SET fromDate string to the dateOneMonthAgo as timestamp - so can display on form
    this.fromDate = date.formatDate(dateOneMonthAgo, 'YYYY/MM/DD')
    console.log(this.fromDate)

    //SET toDate string to todays date timestamp - to display on form
    let currentDate = new Date()
    this.toDate = date.formatDate(currentDate, 'YYYY/MM/DD')
    // this.toDate.Date.now();
    console.log(this.toDate)
    // console.log(player_data_since_date)
    this.loading = false

    // if baseURL = production url then set selectedBaseURL as prod , otherwise set to test
    this.selectedBaseURL = baseURL === "https://wrc-database.cashedarcade.com"?
      'prod':'test'

  },

  computed: {
    formattedFromDate: function () {
      return date.formatDate(this.fromDate, 'DD-MMM-YYYY')
    },

    formattedToDate: function () {
      return date.formatDate(this.toDate, 'DD-MMM-YYYY')
    }
  },

  methods: {
    changeBaseURL() {
      setTimeout( () => {
        this.loading = true;
        //change baseURL to prod if toggle set to prod, otherwise set to test
        baseURL = this.selectedBaseURL === 'prod'?
          "https://wrc-database.cashedarcade.com"
          :"https://wrc-database.test.cashedarcade.com"
        
        var dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() - 30);

        let TSdateOneMonthAgo = dateOneMonthAgo.valueOf()

        instance.post(`${baseURL}/getPlayersSinceDate`, {date: TSdateOneMonthAgo})
          .then((response) => {
            console.log(response.data)
            this.recentPlayers = response.data
          })
          .catch(function (error) {
            console.log(error);
          });

        this.fromDate = date.formatDate(dateOneMonthAgo, 'YYYY/MM/DD')
        console.log(this.fromDate)
        let currentDate = new Date()
        this.toDate = date.formatDate(currentDate, 'YYYY/MM/DD')
        console.log(this.toDate)
        this.loading = false;
      }, 1000)
    },

    datePicked () {
      this.loading = true   

      let baseFromDate = new Date(this.fromDate).valueOf() 
      let baseToDate = new Date(this.toDate).valueOf() 

      instance.post(`${baseURL}/getPlayersBetweenDates`, {fromDate: baseFromDate, toDate: baseToDate})
      .then((response) => {
        this.recentPlayers = [ ]
        this.recentPlayers = response.data
      })
      .catch(function (error) {
        console.log(error);
      });

      this.loading = false
    }
  }
})

</script>