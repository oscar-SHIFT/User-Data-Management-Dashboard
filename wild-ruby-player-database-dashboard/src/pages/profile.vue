<template>
  <div class="q-pa-xl bg-blue-grey-1 ">

    <q-input class="q-mb-lg" v-model="search" filled type="search" hint="Search b-Spot ID" @keydown.enter.prevent="searchUser">
        <template v-slot:append>
          <q-icon name="search" @click="searchUser"/>
        </template>
    </q-input>

    <div class="row items-start q-mb-md q-gutter-lg">
        <q-card flat class="profile-card ">
            <q-card-section >
                <h4 class="header">{{ userID }}</h4>
                </q-card-section>
                <q-separator inset/>
                <q-card-section class="q-mt-md">
                    <p>b-Spot ID: <span class="text-weight-bold float-right">{{ userID }}</span></p>
                    <p>Sign up date: <span class="text-weight-bold float-right">{{ signUpDate }}</span></p>
                    <p>Last wager: <span class="text-weight-bold float-right"> <span>${{ lastWager }}</span> at <span>{{ wagerDate }}</span> </span></p>
                    <p>Last game:<span class="text-weight-bold float-right"> <span>{{ lastGame }}</span> at <span>{{ gameDate }}</span> </span></p>
            </q-card-section>
        </q-card>

        <q-card flat class="wager-card row ">
            <q-card-section>
                <h5>${{ totalWager }}</h5>
                <p>LPV</p>
            </q-card-section>
            <q-separator vertical inset/>
            <q-card-section>
                <h5>${{ avgWager }}</h5>
                <p>Avg Spend</p>
            </q-card-section>

        </q-card>
    </div>

    <div class="row q-mt-md">
    <q-table
      title="Wager Activity"
      class="tableWager col q-mr-md"
      :data="wagers"
      :columns="wagerColumns"
      row-key="name"
      :pagination.sync="paginationWagers"
      :loading="loading"
      color="primary"
      flat
      dense
      table-header-style="text-color: white"
    />
    <q-table
      title="Game Activity"
      class="tableGames col q-ml-md"
      :data="games"
      :columns="gamesColumns"
      row-key="name"
      :pagination.sync="paginationGames"
      :loading="loading"
      color="primary"
      flat
      dense
      table-header-style="text-color: white"
    />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
h4, h5 {
    margin: 0;
}

.profile-card {
    min-width:350px
    min-height: 150px;
}

.wager-card {
    
    min-height: 20px;
}
.wager-card p {
    margin:0 
}

.tableWager {
    width: 400px;
}

.tableGames {
    width: 400px;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import { date } from "quasar";
import { store } from "../store/store.ts";
import { sign } from "crypto";

let baseURL = "https://wrc-database.cashedarcade.com";

const instance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" }
});

export default Vue.extend({
  name: "BigQueryPWA",

  data() {
    return {
      search:'',
      total_wagers: [],
      wagers_bought_Data: [],
      user_count: [],
      bet_count: [],

      showUserDialog: false,

      userID: '',
      signUpDate: '',
      lastWager: '',
      wagerDate: '',
      lastGame: '',
      gameDate: '',
      games: [],
      wagers: [],

      returnedUserID: '',

      totalWager: '',
      avgWager:'',

      loading: false,
      paginationWagers: {
        sortBy: "Date",
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      paginationGames: {
        sortBy: "Date",
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      wagerColumns: [
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
          label: "Date purchased",
          field: row => row.timestamp.value,
          format: val => date.formatDate(val, "DD-MM-YYYY"),
          sortable: true,
        }
      ],
      gamesColumns: [
        {
          name: "Name",
          align: "left",
          label: "Name",
          field: "game_name",
          sortable: true
        },
        {
          name: "Bet amount",
          align: "left",
          label: "Bet $USD",
          field: "bet_amount",
          sortable: true
        },
        {
          name: "Win amount",
          align: "left",
          label: "Win $USD",
          field: "win_amount",
          sortable: true
        },
        {
          name: "Date",
          align: "left",
          label: "Date",
          field: row => row.timestamp.value,
          format: val => date.formatDate(val, "DD-MM-YYYY"),
          sortable: true
        }
      ]
    };
  },

  methods: {
    searchUser() {
      this.userID = this.search
      //Get users data 
      this.getSignUpDate()
      this.getLastWager()
      this.getLastGame()
      this.getGames()
      this.getUsersWagers()
      this.getWagerSum()
      this.getAvgWagerCost()

      this.search = ''
    },

    getSignUpDate() {
      instance
        .post(`/getSignUpDate`, {
          params: {selectedUser: this.userID}
        })
        .then(response => {
          console.log(response.data)
          if ((response.data).length === 0) {
            this.signUpDate = 'Not Captured'
          } else {
            let signUpObj = response.data;
            let parsedDate = Date.parse(signUpObj[0].timestamp.value);
            this.signUpDate = date.formatDate(parsedDate, "DD-MM-YYYY");
            this.returnedUserID = response.data[0].user_id
          }
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    
    getLastWager() {
      instance
        .post(`/getLastWager`, {params: {selectedUser: this.userID}})
        .then(response => {
          this.lastWager = response.data[0].value;
          let parsedDate = Date.parse(response.data[0].timestamp.value);
          this.wagerDate = date.formatDate(parsedDate, "DD-MM-YYYY");
        })
        .catch(function(error) {
          console.log(error);
        })
    },

    getLastGame() {
      instance
        .post(`/getLastGame`, {params: {selectedUser: this.userID}})
        .then(response => {
          this.lastGame = response.data[0].game_name
          let parsedDate = Date.parse(response.data[0].timestamp.value);
          this.gameDate = date.formatDate(parsedDate, "DD-MM-YYYY");
        })
        .catch(function(error) {
          console.log(error);
        })
    },

    getGames() {
      instance
        .post(`/getGames`, {params: {selectedUser: this.userID}})
        .then(response => {
          this.games = response.data;
        })
        .catch(function(error) {
          console.log(error);
        })
    },

    getUsersWagers() {
      instance
        .post(`/getUsersWagers`, {params: {selectedUser: this.userID}})
        .then(response => {
          console.log(response.data)
          this.wagers = response.data;
          this.returnedUserID = response.data[0].user_id
        })
        .catch(function(error) {
          console.log(error);
        })
    },

    getWagerSum() {
      instance
        .post(`/getWagerSum`, {params: {selectedUser: this.userID}})
        .then(response => {
          console.log(response.data)
          response.data[0].f0_ === null ? this.totalWager = 0 : this.totalWager = response.data[0].f0_;
        })
        .catch(function(error) {
          console.log(error);
        })
    },

    getAvgWagerCost() {
      instance
        .post(`/getAvgWagerCost`, {params: {selectedUser: this.userID}})
        .then(response => {
          console.log(response.data)
          response.data[0].f0_ === null ? this.avgWager = 0 : this.avgWager = (response.data[0].f0_).toFixed(2);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  created() {
    // ----- Get selected userID from URL -----
    const urlParams = new URLSearchParams(window.location.search);
    this.userID = urlParams.get("userID");
    
    if (this.userID !== null){
      this.showProfile = true

      //Get users data 
      this.getSignUpDate()
      this.getLastWager()
      this.getLastGame()
      this.getGames()
      this.getUsersWagers()
      this.getWagerSum()
      this.getAvgWagerCost()
    }
    
  }
});
</script>