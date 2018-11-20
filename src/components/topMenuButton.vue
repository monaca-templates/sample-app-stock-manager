<template>
  <v-btn block large @click="$emit('on-clicked')" class="top-menu-btn">
    <v-icon class="top-menu-btn-icon text-sm-left">{{ icon }}</v-icon>
    <span class="top-menu-btn-text">{{ label }}</span>
  </v-btn>
</template>

<script>
  export default {
    name: 'TopMenuButton',
    props: {
      icon: String,
      label: String,
    }
  }
</script>

<style>
  .top-menu-btn {
    margin: 5vw 10vw;
    width: 80vw;
    height: 32vw;
  }
  .top-menu-btn-icon {
    font-size: 20vw;
    width: 40%;
  }
  .top-menu-btn-text {
    text-align: left;
    width: 60%;
    font-size: 5vw;
  }
</style>
