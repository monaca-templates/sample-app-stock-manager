<template>
  <span>
    <v-btn icon @click="minus">
      <v-icon class="counter">fa-minus-circle</v-icon>
    </v-btn>
    <span><slot></slot></span>
    <v-btn icon @click="plus">
      <v-icon class="counter">fa-plus-circle</v-icon>
    </v-btn>
  </span>
</template>

<script>
  export default {
    name: 'Counter',
    methods: {
      minus () {
        this.$emit('on-minus')
      },
      plus () {
        this.$emit('on-plus')
      },
    },
  }
</script>

<style scoped>
  .counter {
    padding-bottom: 2px;
  }
</style>
