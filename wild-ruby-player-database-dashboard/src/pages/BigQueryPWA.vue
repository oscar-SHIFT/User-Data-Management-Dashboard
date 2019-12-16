<template>
  <div class="q-pa-lg bg-grey-1">

    <div class="row items-center q-gutter-lg">
      <q-card dark class="bg-grey-9 my-card">
        <q-card-section>Total # wager packs bought</q-card-section>
        <q-separator color="grey-8" inset />
        <q-card-section class="text-center q-mt-md text-h4">{{ total_wagers.f0_ }}</q-card-section>
      </q-card>

      <q-card dark class="bg-grey-9 my-card">
        <q-card-section># of users bought wager pack</q-card-section>
        <q-separator color="grey-8" inset />
        <q-card-section class="text-center q-mt-md text-h4">{{ user_count.f0_ }}</q-card-section>
      </q-card>

      <q-card dark class="bg-grey-9 my-card">
        <q-card-section>Total $ of player bets</q-card-section>
        <q-separator color="grey-8" inset />
        <q-card-section class="text-center q-mt-md text-h4">${{ bet_count.f0_ }}</q-card-section>
      </q-card>
    </div>
    <br />

    <br />
    <q-table
      title="Wager purchases"
      class="table bg-grey-9"
      :data="wagers_bought_Data"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
      :filter="filter"
      :loading="loading"
      dark
      color="primary"
      flat
      table-header-style="text-color: white"
      @click="showUserDialog = true"
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-ID="cellProperties">
        <q-td :props="cellProperties">
          <a :href="`/profile?userID=${cellProperties.row.user_id}`">{{ cellProperties.row.user_id}}</a> 
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  min-height: 150px;
}

.table {
  max-width: 798px;
}

.cardSection {
  text-center;
}

a {
  color: white;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import { date } from "quasar";
import { store } from "../store/store.ts";

let baseURL = "https://wrc-database.cashedarcade.com";

const instance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" }
});

export default Vue.extend({
  name: "BigQueryPWA",

  data() {
    return {
      lorem: "Lorem ",
      total_wagers: "",
      wagers_bought_Data: [],
      user_count: [],
      bet_count: [],

      showUserDialog: false,

      userID: "",
      signUpDate: [],
      lastWager: [],
      lastGame: [],

      loading: false,
      filter: "",
      pagination: {
        sortBy: "Date",
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      columns: [
        {
          name: "ID",
          align: "left",
          label: "b-spot ID",
          field: "user_id",
          sortable: true
        },
        {
          name: "Amount",
          align: "left",
          label: "Amount $USD",
          field: "cost",
          sortable: true
        },
        {
          name: "Date",
          align: "left",
          label: "Date",
          field: row => row.original_timestamp.value,
          sortable: true,
          format: val => date.formatDate(val, "DD-MM-YYYY")
        }
      ]
    };
  },
  methods: {
    showUser: function(user_id) {
      this.showUserDialog = true;
    },

    getSignUpDate(userID) {
      instance
        .post(`/getSignUpDate`, { userID: userID })
        .then(response => {
          let wagerObj = response.data;
          this.total_wagers = wagerObj[Object.keys(wagerObj)[0]];
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  created() {
    // function getTotalWager() {
    //   return instance.post(`/getTotalWager`, {})
    // }
    // function getWagers() {
    //   return instance.post(`/getWagers`, {})
    // }
    // axios.all([getTotalWager(), getWagers()])
    //   .then(axios.spread((response)=> {
    //     console.log(response)
    //     this.total_wagers = response.data
    //     console.log(this.total_wagers)
    //     this.wagers_bought = response.data
    //     console.log(this.wagers_bought)
    // }));

    instance
      .post(`/getTotalWager`, {})
      .then(response => {
        let wagerObj = response.data;
        console.log(wagerObj);
        this.total_wagers = wagerObj[Object.keys(wagerObj)[0]];
        console.log(this.total_wagers);
      })
      .catch(function(error) {
        console.log(error);
      });
    instance.post(`/getWagers`, {}).then(response => {
      this.wagers_bought_Data = response.data;
    });
    instance.post(`/getUserCount`, {}).then(response => {
      let userCountObj = response.data;
      this.user_count = userCountObj[Object.keys(userCountObj)[0]];
    });
    instance.post(`/getBetCount`, {}).then(response => {
      let betCountObj = response.data;
      this.bet_count = betCountObj[Object.keys(betCountObj)[0]];
    });
  }
});
</script>