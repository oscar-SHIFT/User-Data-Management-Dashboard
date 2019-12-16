<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { store } from './store/store.ts'
import buildJson from './statics/build-config.json'

export default Vue.extend( {
  created() {
  name: 'App'
    console.log(buildJson)
    store.commit('setBuildConfig', buildJson)

    axios.get('/statics/deploy-config.json').then((res) => {
      console.log(res.data)
      store.commit('setDeployConfig', res.data)
    })
  }
})
</script>


<style>
</style>
