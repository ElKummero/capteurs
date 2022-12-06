<template>
  <q-page class="flex flex-center column">
    <q-item-label class="text-weight-light q-ma-lg">DIVTEC - Capteurs températures</q-item-label>
    <q-item-label class="text-weight-bold q-ma-lg" style="color: #c20000" v-show="!user">Veuillez vous connecter</q-item-label>
    <q-list class="flex flex-center" v-show="!showTable && user">
      <q-item-section class="q-pa-lg q-ma-md flex flex-center capteurs-preview padding"
                      :class="isSelected"
                      v-for="apiSalle in listeSalles"
                      :key="apiSalle.id"
                      :salle="apiSalle"
                      @click="openListDisplay(apiSalle)">
        <q-item-label class="flex flex-center text-body1 text-weight-light text-italic">{{ apiSalle.salle.nom }}</q-item-label>
        <q-item-label class="text-caption text-weight-light">{{ apiSalle.mesures[0].temperature }}°C</q-item-label>
      </q-item-section>
    </q-list>
    <q-item-section class="flex absolute q-mb-lg full-height full-width q-mt-lg" v-show="showTable">
      <q-table
        class="full-height"
        :rows=rows
        v-model:pagination="pagination"
        :columns=columns>
      </q-table>
      <q-page-sticky position="bottom" class="q-mb-lg">
        <q-btn
          round
          fab
          color="primary"
          icon="close"
          @click="closeListDisplay()"/>
      </q-page-sticky>
    </q-item-section>
  </q-page>
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Mesure',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'TEMPERATURE', label: 'Température', field: row => row.temperature + '°C', sortable: true },
  { name: 'HUMIDITE', label: 'Humidité', field: row => row.humidite + '%' },
  { name: 'SEQUENCE', label: 'Séquence', field: row => row.sequence },
  { name: 'DATE', label: 'Date / Heure', field: row => row.date, sortable: true }
]

export default defineComponent({
  name: 'IndexPage',
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('salles', ['listeSalles'])
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 10 // current rows per page being displayed
      },
      showTable: false,
      currentSalle: null,
      columns,
      rows: [],
      active: false
    }
  },
  methods: {
    ...mapActions('salles', ['getCapteursApi']),
    openListDisplay (salle) {
      this.showTable = true
      this.rows = []
      for (const mesureKey in salle.mesures) {
        this.rows.push(toRaw(salle.mesures[mesureKey]))
      }
    },
    closeListDisplay () {
      this.showTable = false
    },
    handleClick (box) {
      box.active = !box.active
    }
  },
  mounted () {
    this.getCapteursApi()
  }
})
</script>
<style lang="css" scoped>

.capteurs-preview {
  background: #efefef;
}

.capteurs-preview:hover {
  cursor: pointer;
  background: #e3e3e3;
}
</style>
