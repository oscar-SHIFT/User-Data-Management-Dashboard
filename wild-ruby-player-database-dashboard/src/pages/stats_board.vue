<template>
	<div style="width: 100%">
		<div class="row">
			<q-card class="column dark" dark>
				<span class="point6">Sign Ups</span>
				<span>(weekly)</span>
				<span>
					<q-icon v-if="this.thisWeekNewPlayerCount > this.lastWeekNewPlayerCount" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.thisWeekNewPlayerCount < this.lastWeekNewPlayerCount" name="trending_down" style="color: #A00;"/>
					{{this.getPercentageChange(this.thisWeekNewPlayerCount, this.lastWeekNewPlayerCount)}}
				</span>
				<span class="point9">{{this.thisWeekNewPlayerCount}}</span>
			</q-card>
			<q-card class="column dark" dark>
				<span class="point6">ADWs Approved</span>
				<span>(weekly)</span>
				<span>
					<q-icon v-if="this.thisWeekADWApprovedCount > this.lastWeekADWApprovedCount" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.thisWeekADWApprovedCount < this.lastWeekADWApprovedCount" name="trending_down" style="color: #A00;"/>
					{{this.getPercentageChange(this.thisWeekADWApprovedCount, this.lastWeekADWApprovedCount)}}
				</span>
				<span class="point9">{{this.thisWeekADWApprovedCount}}</span>
			</q-card>
			<q-card class="column dark" dark>
				<span class="point6">Wager Packs</span>
				<span>(weekly)</span>
				<span>
					<q-icon v-if="this.thisWeekWagerPacksCount > this.lastWeekWagerPacksCount" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.thisWeekWagerPacksCount < this.lastWeekWagerPacksCount" name="trending_down" style="color: #A00;"/>
					{{this.getPercentageChange(this.thisWeekWagerPacksCount, this.lastWeekWagerPacksCount)}}
				</span>
				<span class="point9">{{this.thisWeekWagerPacksCount}}</span>
			</q-card>
			<q-card class="column dark" dark>
				<span class="point6">Total Wagered</span>
				<span>(weekly)</span>
				<span>
					<q-icon v-if="this.thisWeekWagerPackTotal > this.lastWeekWagerPackTotal" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.thisWeekWagerPackTotal < this.lastWeekWagerPackTotal" name="trending_down" style="color: #A00;"/>
					{{this.getPercentageChange(this.thisWeekWagerPackTotal, this.lastWeekWagerPackTotal)}}
				</span>
				<span class="point9">${{(this.thisWeekWagerPackTotal).toFixed(2)}}</span>
			</q-card>
			<q-card class="column dark" dark>
				<span class="point6">Total Wagered</span>
				<span>(daily)</span>
				<span>
					<q-icon v-if="this.todayWagerPackTotal > this.yesterdayWagerPackTotal" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.todayWagerPackTotal < this.yesterdayWagerPackTotal" name="trending_down" style="color: #A00;"/>
					{{this.getPercentageChange(this.todayWagerPackTotal, this.yesterdayWagerPackTotal)}}
				</span>
				<span class="point9">${{(this.todayWagerPackTotal).toFixed(2)}}</span>
			</q-card>
		</div>
		<div class="row">
			<div class="column">
				<q-table dark
				title="$$ Played per Game (monthly)"
      			class="bg-grey-8"
				:data="this.thisMonthGamesBySpend"
				:columns="[
					{name: 'game', required: true, label: 'Game', align: 'left', field: 'key', sortable: true},
					{name: 'amount', required: true, label: 'USD', align: 'right', field: 'value', sortable: true}
				]"
				row-key="game"
				:loading="this.thisMonthReveals == null"
				:dense="true"
				:hide-bottom="true"
				:pagination="{ page: 1, rowsPerPage: 10 }"
				>
    			</q-table>
				<span style="position: relative; top: -320px;">
					${{(this.thisMonthTotalRevealed / 100).toFixed(2)}}
					<q-icon v-if="this.thisMonthTotalRevealed > this.lastMonthTotalRevealed" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.thisMonthTotalRevealed < this.lastMonthTotalRevealed" name="trending_down" style="color: #A00;"/>
					 {{this.getPercentageChange(this.thisMonthTotalRevealed, this.lastMonthTotalRevealed)}}
				</span>
			</div>
			<div class="column">
				<q-table dark
      			class="bg-grey-8"
				title="Spins per Game (weekly)"
				:data="this.thisWeekGamesBySpins"
				:columns="[
					{name: 'game', required: true, label: 'Game', align: 'left', field: 'key', sortable: true},
					{name: 'amount', required: true, label: 'Spins', align: 'right', field: 'value', sortable: true}
				]"
				row-key="game"
				:loading="this.thisMonthReveals == null"
				:dense="true"
				:hide-bottom="true"
				:pagination="{ page: 1, rowsPerPage: 10 }"
				>
    			</q-table>
				<span style="position: relative; top: -320px;">
					{{this.thisWeekTotalSpins}}
					<q-icon v-if="this.thisWeekTotalSpins > this.lastWeekTotalSpins" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.thisWeekTotalSpins < this.lastWeekTotalSpins" name="trending_down" style="color: #A00;"/>
					 {{this.getPercentageChange(this.lastWeekTotalSpins, this.lastWeekTotalSpins)}}
				</span>
			</div>
			<div class="column">
				<q-table dark
      			class="bg-grey-8"
				title="Player Reveal Totals (weekly)"
				:data="this.thisWeekPlayersBySpend"
				:columns="[
					{name: 'name', required: true, label: 'BSpot ID', align: 'left', field: 'key', sortable: true},
					{name: 'amount', required: true, label: 'USD', align: 'right', field: 'value', sortable: true}
				]"
				row-key="name"
				:loading="this.thisMonthReveals == null"
				:dense="true"
				:hide-bottom="true"
				:pagination="{ page: 1, rowsPerPage: 10 }"
				>
    			</q-table>
				<span style="position: relative; top: -320px;">
					${{(this.thisWeekTotalRevealed / 100).toFixed(2)}}
					<q-icon v-if="this.thisWeekTotalRevealed > this.lastWeekTotalRevealed" name="trending_up" style="color: #0A0;"/>
					<q-icon v-if="this.thisWeekTotalRevealed < this.lastWeekTotalRevealed" name="trending_down" style="color: #A00;"/>
					 {{this.getPercentageChange(this.thisWeekTotalRevealed, this.lastWeekTotalRevealed)}}
				</span>
			</div>
		</div>
	</div>
</template>

<style>
.row {
	display: flex; flex-direction: row; width: 100%; justify-content: center; align-items: center;
}
.column {
	display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 2% 2% 2% 2%;
	min-width: 150px; min-height: 150px; color: #f5f5f5;
}
.dark {
	background-color: #696969;
}
.point6 {
	font-size: 20px !important;
}
.point9 {
	font-size: 32px !important;
}
</style>

<script>

import Vue from 'vue'
import axios from 'axios'
import {date} from 'quasar'
import {store} from "../store/store.ts";

// Check what environment if not test use production baseURL, which is substituted into calls
let databaseURL;
let playerServiceURL;
if (store.state.deployConfig.environment === "production") {
	databaseURL = "https://wrc-database.cashedarcade.com";
	playerServiceURL = "https://wrc-player-service.wildrubycasino.com";
} else {
	databaseURL = "https://wrc-database.test.cashedarcade.com";
	playerServiceURL = "https://wrc-player-service.test.wildrubycasino.com";
}

const instance = axios.create({
headers: { 'Content-Type': 'application/json' },
})

export default Vue.extend ({
	name: 'StatsBoard',

	data() {
		return {
			loading: true,
			lastMonthReveals: [],
			thisMonthReveals: [],
			lastWeekPlayers: [],
			thisWeekPlayers: [],
			lastWeekReveals: [],
			thisWeekReveals: [],
			wagerData: []
		}
	},

	created() {

		// ----- ALL Wager Data -----
		this.getWagerData( (response) => {
          this.wagerData = response.data;
		});

		// ----- Monthly Stats -----
		let dateOneMonthAgo = new Date();
		dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() - 30);
		let dateTwoMonthsAgo = new Date();
		dateTwoMonthsAgo.setDate(dateTwoMonthsAgo.getDate() - 60);

		// Last Month
		this.getRevealsBetweenDates(dateTwoMonthsAgo, dateOneMonthAgo, (response) => {
			this.lastMonthReveals = response.data;
		});

		// This Month
		this.getRevealsSinceDate(dateOneMonthAgo, (response) => {
			this.thisMonthReveals = response.data;
		});


		// ----- Weekly Stats -----
		let dateOneWeekAgo = new Date();
		dateOneWeekAgo.setDate(dateOneWeekAgo.getDate() - 7);
		let dateTwoWeeksAgo = new Date();
		dateTwoWeeksAgo.setDate(dateTwoWeeksAgo.getDate() - 14);

		// Last Week
		this.getPlayersBetweenDates(dateTwoWeeksAgo, dateOneWeekAgo, (response) => {
			this.lastWeekPlayers = response.data;
		});
		this.getRevealsBetweenDates(dateTwoWeeksAgo, dateOneWeekAgo, (response) => {
			this.lastWeekReveals = response.data;
		});

		// This Week
		this.getPlayersSinceDate(dateOneWeekAgo, (response) => {
			this.thisWeekPlayers = response.data;
		});
		this.getRevealsSinceDate(dateOneWeekAgo, (response) => {
			this.thisWeekReveals = response.data;
		});
	},

	methods: {
		getWagerData(onSuccess) {
			instance.post(`${databaseURL}/getWagers`)
			.then( (response) => {
				onSuccess(response);
			}).catch( (error) => {
				console.log(error);
			});
		},
		getPlayersSinceDate(date1, onSuccess) {
			instance.post(`${databaseURL}/getPlayersSinceDate`, {date: date1.valueOf()})
			.then( (response) => {
				onSuccess(response);
			}).catch( (error) => {
				console.log(error);
			});
		},
		getPlayersBetweenDates(date1, date2, onSuccess) {
			instance.post(`${databaseURL}/getPlayersBetweenDates`, {fromDate: date1.valueOf(), toDate: date2.valueOf()})
			.then( (response) => {
				onSuccess(response);
			}).catch( (error) => {
				console.log(error);
			});
		},
		getRevealsSinceDate(date1, onSuccess) {
			instance.post(`${playerServiceURL}/getRevealsSinceDate`, { date: date.formatDate(date1, 'YYYY-MM-DD') })
			.then( (response) => {
				onSuccess(response);
			}).catch( (error) => {
				console.log(error);
			});
		},
		getRevealsBetweenDates(date1, date2, onSuccess) {
			instance.post(`${playerServiceURL}/getRevealsBetweenDates`, {
				date1: date.formatDate(date1, 'YYYY-MM-DD'),
				date2: date.formatDate(date2, 'YYYY-MM-DD')
			})
			.then( (response) => {
				onSuccess(response);
			}).catch( (error) => {
				console.log(error);
			});
		},
		getADWApproved(list) {
			let total = 0;
			list.forEach( (player) => {
				if (player.adwStatus === "approved") { total++; }
			});
			return total;
		},
		getListTotalOfValue(list, value) {
			let total = 0;
			list.forEach( (reveal) => { total += reveal[value]; });
			return total;
		},
		getKeyInListByValue(list, key, value, isMoney) {
			let retVal = [];
			for (let j=0; j < list.length; j++) {
				let reveal = list[j];
				let found = false;
				for (let i=0; i < retVal.length; i++) {
					if (retVal[i].key === reveal[key]) {
						retVal[i].value += (reveal[value] || 1);
						found = true;
						break;
					}
				}
				if (!found) {
					retVal.push( { key: reveal[key], value: (reveal[value] || 1)} );
				}
			};
			retVal = retVal.sort( (a, b) => { return b.value - a.value; } );
			if (isMoney) {
				for (let i=0; i < retVal.length; i++) {
					retVal[i].value = "$" + (retVal[i].value / 100).toFixed(2);
				}
			}
			return retVal;
		},
		getPercentageChange(num1, num2) {
			return (num1 === num2) ? "- 0%" : ((num2 === 0) ? "100%" :  Math.round( Math.abs(1 - (num1 / num2)) * 100 ) + "%");
		},
		getWagersBetweenDates(date1, date2) {
			let retVal = [];
			if (!date2) { date2 = new Date(); }
			for (let i=0; i < this.wagerData.length; i++) {
				let wagerDateStamp = new Date(this.wagerData[i].original_timestamp.value).valueOf();
				if (date1.valueOf() < wagerDateStamp && date2.valueOf() > wagerDateStamp) {
					retVal.push(this.wagerData[i]);
				}
			}
			return retVal;
		}
	},

	computed: {
		lastMonthTotalRevealed() {
			return this.getListTotalOfValue(this.lastMonthReveals, "amountincents");
		},

		thisMonthTotalRevealed() {
			return this.getListTotalOfValue(this.thisMonthReveals, "amountincents");
		},
		thisMonthGamesBySpend() {
			return this.getKeyInListByValue(this.thisMonthReveals, "gamename", "amountincents", true);
		},

		// Last Week
		lastWeekNewPlayerCount() {
			return this.lastWeekPlayers.length;
		},
		lastWeekADWApprovedCount() {
			return this.getADWApproved(this.lastWeekPlayers);
		},
		lastWeekTotalSpins() {
			return this.lastWeekReveals.length;
		},
		lastWeekTotalRevealed() {
			return this.getListTotalOfValue(this.lastWeekReveals, "amountincents");
		},
		lastWeekWagerPacksCount() {
			let dateOneWeekAgo = new Date();
			dateOneWeekAgo.setDate(dateOneWeekAgo.getDate() - 7);
			let dateTwoWeeksAgo = new Date();
			dateTwoWeeksAgo.setDate(dateTwoWeeksAgo.getDate() - 14);
			return this.getWagersBetweenDates(dateTwoWeeksAgo, dateOneWeekAgo).length;
		},
		lastWeekWagerPackTotal() {
			let dateOneWeekAgo = new Date();
			dateOneWeekAgo.setDate(dateOneWeekAgo.getDate() - 7);
			let dateTwoWeeksAgo = new Date();
			dateTwoWeeksAgo.setDate(dateTwoWeeksAgo.getDate() - 14);
			let wagers = this.getWagersBetweenDates(dateTwoWeeksAgo, dateOneWeekAgo);
			return this.getListTotalOfValue(wagers, "cost");
		},

		// This Week
		thisWeekNewPlayerCount() {
			return this.thisWeekPlayers.length;
		},
		thisWeekADWApprovedCount() {
			return this.getADWApproved(this.thisWeekPlayers);
		},
		thisWeekTotalSpins() {
			return this.thisWeekReveals.length;
		},
		thisWeekTotalRevealed() {
			return this.getListTotalOfValue(this.thisWeekReveals, "amountincents");
		},
		thisWeekGamesBySpins() {
			return this.getKeyInListByValue(this.thisWeekReveals, "gamename", "spins");
		},
		thisWeekPlayersBySpend() {
			let players = this.getKeyInListByValue(this.thisWeekReveals, "bspotid", "amountincents", true);
			while (players.length < 10) {
				players.push({ key: "---", value: "$0.00" });
			}
			return players;
		},
		thisWeekWagerPacksCount() {
			let dateOneWeekAgo = new Date();
			dateOneWeekAgo.setDate(dateOneWeekAgo.getDate() - 7);
			return this.getWagersBetweenDates(dateOneWeekAgo).length;
		},
		thisWeekWagerPackTotal() {
			let dateOneWeekAgo = new Date();
			dateOneWeekAgo.setDate(dateOneWeekAgo.getDate() - 7);
			let wagers = this.getWagersBetweenDates(dateOneWeekAgo);
			return this.getListTotalOfValue(wagers, "cost");
		},

		yesterdayWagerPackTotal() {
			let dateOneDayAgo = new Date();
			dateOneDayAgo.setDate(dateOneDayAgo.getDate() - 1);
			let dateTwoDaysAgo = new Date();
			dateTwoDaysAgo.setDate(dateTwoDaysAgo.getDate() - 2);
			let wagers = this.getWagersBetweenDates(dateTwoDaysAgo, dateOneDayAgo);
			console.log(wagers);
			return this.getListTotalOfValue(wagers, "cost");
		},
		todayWagerPackTotal() {
			let dateOneDayAgo = new Date();
			dateOneDayAgo.setDate(dateOneDayAgo.getDate() - 1);
			let wagers = this.getWagersBetweenDates(dateOneDayAgo);
			console.log(wagers);
			return this.getListTotalOfValue(wagers, "cost");
		},
	}
})

</script>