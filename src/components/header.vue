<template>
  <v-toolbar>
    <slot name="navi"></slot>
    <v-toolbar-title>
      <slot name="title"></slot>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Header',
  }
</script>
