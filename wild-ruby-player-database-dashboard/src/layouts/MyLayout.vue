<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Wild Ruby User Management</q-toolbar-title>

        <div>{{ versionString }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2" :width="200">
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <q-item clickable to="/" exact v-ripple active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Search all users</q-item-label>
            <!-- <q-item-label caption>v1.quasar-framework.org</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-item clickable to="/stats_board" exact v-ripple active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Statistics Board</q-item-label>
            <!-- <q-item-label caption>v1.quasar-framework.org</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-item clickable to="/recently_added_users" v-ripple active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Recent users</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/bigQueryPWA" v-ripple active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Big Query PWA</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/profile" v-ripple active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from "vue";
import { openURL } from "quasar";
import { store } from "src/store/store.ts";

export default Vue.extend({
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,

      link: "search"
    };
  },

  computed: {
    versionString() {
      return store.state.buildConfig.versionString;
    }
  },

  methods: {
    openURL
  }
});
</script>

<style lang="stylus">
.my-menu-link {
  color: white;
  background: #939696;
}
</style>
   