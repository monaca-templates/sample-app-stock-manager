<template>
  <v-btn block large @click="$emit('on-clicked')" class="cart-btn">
    <v-icon class="cart-icon">fa-shopping-cart</v-icon>
    {{ $t('product_detail.addto_cart') }}
  </v-btn>
</template>

<script>
  export default {
    name: 'CartButton',
  }
</script>

<style scoped>
  .cart-btn {
    font-size: 4vw;
  }
</style>
