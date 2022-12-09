<template>
  <q-page class="flex flex-center column">
    <q-item-label class="text-weight-light q-ma-lg">Ateliers Informatiques de la DIVTEC</q-item-label>
    <q-item-label class="text-weight-bold q-ma-lg" style="color: #c20000" v-show="!user">Veuillez vous connecter</q-item-label>
    <q-list class="flex flex-center" v-show="!showTable && user">
      <q-item-section class="q-pa-lg q-ma-md flex flex-center capteurs-preview padding"
                      v-for="apiSalle in listeSalles"
                      :key="apiSalle.id"
                      :salle="apiSalle"
                      :class="heat"
                      :style="{backgroundColor: this.getColorTemp(apiSalle.mesures[0].temperature)}"
                      @click="openListDisplay(apiSalle)">
        <q-item-label class="flex flex-center text-body1 text-weight-light text-italic">{{ apiSalle.salle.nom }}</q-item-label>
        <q-item-label class="text-caption text-weight-light">{{ apiSalle.mesures[0].temperature }}°C</q-item-label>
      </q-item-section>
      <div class="previewHeat">
        <span>DIVTEC</span>
      </div>
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
      active: false,
      heat: ''
    }
  },
  methods: {
    ...mapActions('salles', ['getCapteursApi']),
    // Ouvre le tableau de données de températures
    // de la salle
    openListDisplay (salle) {
      this.showTable = true
      this.rows = []
      for (const mesureKey in salle.mesures) {
        this.rows.push(toRaw(salle.mesures[mesureKey]))
      }
    },
    // Donne une représentation de couleurs selon
    // la température de la salle
    getColorTemp (valeur) {
      if (valeur < 10) {
        return '#f7fdff'
      } else if (valeur >= 10 && valeur < 15) {
        return '#d6f7ff'
      } else if (valeur >= 15 && valeur < 20) {
        return '#cff6ff'
      } else if (valeur >= 20 && valeur < 23) {
        return '#ffe6cd'
      } else if (valeur >= 23 && valeur < 25) {
        return '#ffd3a6'
      } else if (valeur >= 25 && valeur < 27) {
        return '#ffb994'
      } else if (valeur >= 27) {
        return '#ff8170'
      }
    },
    // Ferme le tableau de données
    closeListDisplay () {
      this.showTable = false
    }
  },
  mounted () {
    // Donne les valeurs des capteurs de températures
    this.getCapteursApi()
  }
})

</script>
<style lang="css" scoped>

.previewHeat {
  position: absolute;
  width: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
}

.previewHeat span {
  font-weight: bold;
  font-size: 700%;
  opacity: 10%;
  z-index: -1;
  user-select: none;
}

.capteurs-preview {
  background: #efefef;
  border-radius: 4px;
}

.capteurs-preview:hover {
  cursor: pointer;
}

.capteurs-preview:active {
  outline: solid 1px black !important;
}
</style>
