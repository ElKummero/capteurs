<template>
  <q-page padding class="flex flex-center display-salle">
    <q-header class="flex row justify-between items-center elevated ">
      <q-item>Capteur</q-item><q-item><q-icon name="star"></q-icon></q-item>
    </q-header>
      <q-item-section>
        <q-item-section side>
          <q-list>
            <q-item>Salle : </q-item>
            <q-item>Date : 02-12-2022</q-item>
            <q-item>Température : 26.33°C</q-item>
            <q-item>Humidité : 95.12%</q-item>
            <q-item>Id : 1</q-item>
          </q-list>
        </q-item-section>
        <q-item-section side>
          <q-icon name="close" @click="closeCapteurDisplay()"></q-icon>
        </q-item-section>
      </q-item-section>
  </q-page>
</template>

<script>
export default {
  name: 'SalleView',
  methods: {
    closeCapteurDisplay () {
      this.$emit('closeCapteurDisplay')
    }
  }
}
</script>

<style scoped>
.display-salle {
  background: white;
  position: absolute;
  width: 100%;
}
</style>
