import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
        buildConfig: {
        versionString: 'Local Build'
        }, 
        deployConfig: {
          environment: 'local',
        }
    },
    mutations: {
        // Config Data
        setBuildConfig(state, buildConfig) {
          ;(state.buildConfig.versionString = buildConfig.version)
        },
        setDeployConfig(state, deployConfig) {
          state.deployConfig.environment = deployConfig.environment
        }
    }
})

