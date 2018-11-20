<template>
  <v-content>
    <Header>
      <template slot="title">{{ $t('topmenu.title') }}</template>
    </Header>
      <Scanner
        @scan-completed="goToProductDetail"
      ></Scanner>
      <TopMenuButton
        icon="fa-shopping-cart"
        :label="$t('cart_list.title')"
        @on-clicked="goToCartList"
      ></TopMenuButton>
      <!-- TODO: 注文機能・注文履歴機能は未実装 -->
      <TopMenuButton
        icon="fa-history"
        :label="$t('purchase_history.title')"
        @on-clicked=""
      ></TopMenuButton>
  </v-content>
</template>
<script>
  import Scanner from '../components/scanner'
  import TopMenuButton from '../components/topMenuButton'
  import Header from '../components/header'

  export default{
    name: 'TopMenu',
    components: {
      Scanner,
      TopMenuButton,
      Header,
    },
    methods: {
      goToProductDetail (janCode) {
        this.$router.push({
          name: 'product_detail',
          params: { janCode: janCode, },
        })
      },
      goToCartList () {
        this.$router.push({
          name: 'cart_list',
        })
      }
    }
  }
</script>
