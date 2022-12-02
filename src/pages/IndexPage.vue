<template>
  <q-page class="flex flex-center column">
    <q-item-label class="text-weight-light">DIVTEC - Capteurs températures</q-item-label>
    <q-list class="flex flex-center">
      <q-item-section class="q-pa-lg q-ma-md capteurs-preview padding"
                      v-for="salle in listeSalles"
                      :key="salle.id"
                      :salle="salle"
                      @click="isOpen = true">
        <q-item-label class="flex flex-center text-body1 text-weight-light text-italic">{{ salle.name }}</q-item-label>
        <q-item-label class="text-caption text-weight-light">{{ salle.mesures.temperature }}°C</q-item-label>
      </q-item-section>
    </q-list>
    <SalleView v-show="isOpen" @closeCapteurDisplay="closeDisplay()"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import SalleView from 'components/SalleView'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'IndexPage',
  components: { SalleView },
  computed: {
    ...mapGetters('salles', ['listeSalles'])
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    closeDisplay () {
      this.isOpen = false
    }
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
