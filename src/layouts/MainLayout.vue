<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Capteurs
        </q-toolbar-title>

        <q-btn
          v-if="!user"
          to="/connexion"
          flat
          icon-right="account_circle"
          label="Se connecter"
          class="absolute-right"
        />

        <q-btn
          v-else
          @click="deconnecterUtilisateur"
          flat
          icon-right="account_circle"
          label="Se déconnecter"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Pages
        </q-item-label>

        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Capteurs salles</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/favoris" exact>
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Capteurs favoris</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/connexion" exact>
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Compte</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab
          to="/"
          icon="home"
          label="Capteurs"
          exact
        />
        <q-route-tab
          to="/favoris"
          icon="star"
          label="Favoris"
          exact
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapState } from 'vuex'

const linksList = []

export default defineComponent({
  name: 'MainLayout',
  methods: {
    ...mapActions('auth', ['deconnecterUtilisateur'])
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
