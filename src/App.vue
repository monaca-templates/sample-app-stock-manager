<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>
<script>
  import WebFontLoader from 'webfontloader'

  export default{
    name: 'App',
    mounted () {
      WebFontLoader.load({
        google: {
          families: ['Roboto:100,300,400,500,700,900']
        },
        active: this.setFontLoaded
      })
    },
    methods: {
      setFontLoaded () {
        this.$emit('font-loaded')
      },
    }
  };
</script>
