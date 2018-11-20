<template>
  <v-content>
    <Header>
      <v-btn icon class="header-icon" slot="navi" @click="backToTopMenu"><v-icon>fa-arrow-left</v-icon></v-btn>
      <template slot="title">{{ $t('cart_list.title') }}</template>
    </Header>
    <div class="cart-list-container">
      <v-list two-line>
        <v-list-tile
          v-for="(val, key) in cartList"
          :key="key"
        >
          <v-list-tile-action>
            <img
              :src="val.thumbnailUrl"
              class="thumbnail-image"
              @click="goToProductDetail(val.janCode, val.count, val.addedAt)"
            >
          </v-list-tile-action>
          <v-list-tile-content class="cart-item-container">
            <v-list-tile-title>{{ val.name }}</v-list-tile-title>
            <v-list-tile-sub-title style="text-align:right;font-size:5vw;">
              <span>{{ $t('cart_list.price_yen', { price: val.price }) }}円</span>
              <Counter
                @on-minus="countMinus(key)"
                @on-plus="countPlus(key)"
              >{{ val.count }}</Counter>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-btn block large @click="order">{{ $t('cart_list.goto_order') }}</v-btn>
    </div>
  </v-content>
</template>

<script>
  import Counter from '../components/Counter'
  import Header from '../components/Header'

  export default {
    name: 'CartList',
    components: {
      Counter,
      Header,
    },
    data () {
      return {
        cartList: {},
        maxCount: 99,
        minCount: 1,
      }
    },
    methods: {
      countMinus (key) {
        if (this.cartList[key].count - 1 >= this.minCount) {
          this.cartList[key].count--
          this.updateCount(key)
        }
      },
      countPlus (key) {
        if (this.cartList[key].count + 1 <= this.maxCount) {
          this.cartList[key].count++
          this.updateCount(key)
        }
      },
      updateCount (key) {
        // データベースアクセス
        firebase.database().ref(`/cart_list/${key}/`).update({
          count: this.cartList[key].count
        })
      },
      goToProductDetail (janCode, count, addedAt) {
        this.$router.push({
          name: 'product_detail',
          params: {
            janCode: janCode,
            countInCart: count,
            addedAt: addedAt,
          }
        })
      },
      backToTopMenu () {
        this.$router.push({ name: 'topmenu' })
      },
      order () {
        // TODO: アラートを出すだけ、機能未実装
        let message = ''
        let sum = 0
        for (let key in this.cartList) {
          const item = this.cartList[key]
          sum += item.price * item.count
          message += `${item.name}×${item.count}個(${item.price * item.count}円)` + '\n'
        }
        alert(`${message}以上を注文します。（小計：${sum}円）`)
      }
    },
    mounted () {
      firebase.database().ref('/cart_list/').on('value', (ss) => {
        this.cartList = ss.val()
      })
    }
  }
</script>

<style scoped>
  .thumbnail-image {
    width: 16vw;
  }
  .cart-item-container {
    margin-left: 4vw;
  }
</style>
