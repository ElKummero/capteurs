<template>
  <q-page class="flex flex-center column">
    <q-item-label class="text-weight-light q-ma-lg">DIVTEC - Capteurs températures</q-item-label>
    <q-list class="flex flex-center">
      <q-item-section class="q-pa-lg q-ma-md flex flex-center capteurs-preview padding"
                      v-for="apiSalle in listeSalles"
                      :key="apiSalle.id"
                      :salle="apiSalle"
                      @click="openListDisplay(apiSalle)">
        <q-item-label class="flex flex-center text-body1 text-weight-light text-italic">{{ apiSalle.salle.nom }}</q-item-label>
        <q-item-label class="text-caption text-weight-light">{{ apiSalle.mesures[0].temperature }}°C</q-item-label>
      </q-item-section>
    </q-list>
    <q-table class="flex q-mb-lg"
      v-show="showTable"
      title="Capteurs"
      :rows=rows
      :columns=columns
      row-key="name">
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import { mapActions, mapGetters } from 'vuex'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Mesure',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'ID', align: 'center', label: 'Id', field: row => '#' + row.id, sortable: true },
  { name: 'TEMPERATURE', label: 'Température', field: row => row.temperature + '°C', sortable: true },
  { name: 'HUMIDITE', label: 'Humidité', field: row => row.humidite + '%' },
  { name: 'SEQUENCE', label: 'Séquence', field: row => row.sequence },
  { name: 'DATE', label: 'Date / Heure', field: row => row.date, sortable: true }
]

const rows = [
  /*
  {
    name: '#1',
    id: 695,
    temperature: 17.7 + '°C',
    humidite: 44 + '%',
    sequence: 1764,
    date: '2022-12-05 | 07:09:10'
  }
*/]

export default defineComponent({
  name: 'IndexPage',
  computed: {
    ...mapGetters('salles', ['listeSalles'])
  },
  data () {
    return {
      showTable: false,
      currentSalle: null,
      columns,
      rows
    }
  },
  methods: {
    ...mapActions('salles', ['getCapteursApi']),
    closeDisplay () {
      this.isOpen = false
    },
    openListDisplay (salle) {
      this.showTable = true
      this.rows = []
      for (const mesureKey in salle.mesures) {
        console.log(toRaw(salle.mesures[mesureKey]))
        rows.push(toRaw(salle.mesures[mesureKey]))
      }
    }
  },
  mounted () {
    this.getCapteursApi()
  }
})
</script>
<style lang="css" scoped>

.capteurs-preview {
  border: solid 2px var(--q-primary);
}

.capteurs-preview:hover {
  cursor: pointer;
  background: #efefef;
}
</style>
