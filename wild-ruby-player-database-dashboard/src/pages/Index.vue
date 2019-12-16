<template>
  <div class="q-pa-md">
    <q-table
      :data="allPlayers"
      :columns="columns"
      row-key="email"
      :loading="loading"
      :filter="filter"
      :pagination.sync="pagination"
    >
      <template v-slot:top-left>
        <q-btn-toggle
          class="col-auto"
          v-model="selectedBaseURL"
          @input= 'changeBaseURL'
          toggle-color="primary"
          :options="[
            {label: 'Prod', value: 'prod'},
            {label: 'Test', value: 'test'},
          ]"
        />
      </template>

      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-ID="cellProperties">
        <q-td :props="cellProperties">
          <a class="text-grey-9" :href="`/profile?userID=${cellProperties.row.bspotId}`">{{ cellProperties.row.bspotId}}</a> 
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style>
</style>

<script>
import Vue from "vue";
import axios from "axios";
import {date} from "quasar";
import {store} from "../store/store.ts";
import {setTimeout} from "timers";

let baseURL =
  store.state.deployConfig.environment === "production"? 
    "https://wrc-database.cashedarcade.com"
    : "https://wrc-database.test.cashedarcade.com";

const instance = axios.create({
headers: { 'Content-Type': 'application/json' },
})

export default Vue.extend({
  name: "PageIndex",

  data() {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: "date",
        descending: true,
        page: 1,
        rowsPerPage: 15,
      },
      columns: [
        {
          name: "email",required: true, label: "Email", align: "left", field: "email", sortable: true
        },
        {
          name: "ID", required: true, label: "bspotId", align: "center", field: "bspotId", sortable: true
        },
        {
          name: "ADW", required: true, label: "ADW status", align: "center", field: "adwStatus", sortable: true
        },
        {
          name: "date", required: true, label: "Date created", align: "center", field: "dateOfCreation", sortable: true, format: dateOfCreation => date.formatDate(dateOfCreation, "DD-MM-YYYY")
        }
      ],
      allPlayers: [],
      search: '',
      selectedBaseURL: ''
    };
  },

  created() {
    //turn on loading indicator
    this.loading = true;

    instance.post(`${baseURL}/getAllPlayers`, {})
      .then((response) => {
        console.log(response)
        this.allPlayers = response.data
        console.log(this.allPlayers)
      })

    // if baseURL = production url then set selectedBaseURL as prod , otherwise set to test
    this.selectedBaseURL = baseURL === "https://wrc-database.cashedarcade.com"?
      'prod':'test'
  
    //turn off loading indicator
    this.loading = false;
  },

  methods: {
    changeBaseURL() {
      setTimeout( () => {
        this.loading = true;
        //change baseURL to prod if toggle set to prod, otherwise set to test
        baseURL = this.selectedBaseURL === 'prod'?
          "https://wrc-database.cashedarcade.com"
          :"https://wrc-database.test.cashedarcade.com"
        
        instance.post(`${baseURL}/getAllPlayers`, {})
          .then((response) => {
            this.allPlayers = response.data
          })
        this.loading = false;
      }, 1000)
    }
  }
});
</script>
