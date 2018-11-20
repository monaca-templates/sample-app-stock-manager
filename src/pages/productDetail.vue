<template>
  <v-content>
    <Header>
      <v-btn icon class="header-icon" slot="navi" @click="backToTopMenu"><v-icon>fa-arrow-left</v-icon></v-btn>
      <template slot="title">{{ $t('product_detail.title') }}</template>
    </Header>
    <div class="detail-container">
      <h1 class="display-2">{{ product.name }}</h1>
      <div class="image-container">
        <img :src="product.imageUrl" :alt="$t('product_detail.image')" class="mainImage">
      </div>
      <div class="price-container">
        <p class="headline" style="width:30%;">{{ product.price }}円</p>
        <p class="headline" style="width:70%;">
          {{ $t('product_detail.count') }}
          <Counter
            @on-minus="countMinus"
            @on-plus="countPlus"
          >{{ count }}</Counter>
        </p>
      </div>
      <p v-if="countInCart" style="color:tomato">{{ $t('cart_status', { countInCart: countInCart, addedAt: addedAt }) }}</p>
      <CartButton
        @on-clicked="addToCart"
      > </CartButton>
      <p>{{ product.description }}</p>
      <a :href="product.url">{{ $t('product_detail.exhibit_url', { url: product.url }) }}</a>
    </div>
  </v-content>
</template>

<script>
  const moment = require('moment')
  import axios from 'axios'
  import CartButton from '../components/cartButton'
  import Counter from '../components/counter'
  import Header from '../components/header'

  export default {
    name: 'ProductDetail',
    components: {
      CartButton,
      Counter,
      Header,
    },
    props: {
      janCode: String,
      countInCart: Number,
      addedAt: String,
    },
    data () {
      return {
        product: {},
        appId: 'dj00aiZpPUQ4RTBUUTVSNUs3TyZzPWNvbnN1bWVyc2VjcmV0Jng9NTI-',
        apiUrl: 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch',
        count: 1,
      }
    },
    computed: {
      totalPrice () {
        return Number(this.product.price) * this.count
      }
    },
    methods: {
      searchProduct () {
        // Yahoo!商品検索APIを使用して、JANコードを条件に検索結果のトップを取得する
        axios.get(this.apiUrl, {
          params: {
            appid: this.appId,
            jan: this.janCode,
          }
        })
        .then((res) => {
          if (res.Error) throw new Error(res.Error.Message)

          const resultData = res.data.ResultSet[0].Result[0]
          this.product = {
            name: resultData.Name,
            description: resultData.Description,
            url: resultData.Url,
            imageUrl: resultData.Image.Medium,
            thumbnailUrl: resultData.Image.Small,
            price: resultData.Price._value,
            janCode: resultData.JanCode,
          }
        })
        .catch((e) => {
          alert(e)
          this.$router.push({ name: 'topmenu' })
        })
      },
      countMinus () {
        if (this.count - 1 > 0) {
          this.count--
        }
      },
      countPlus () {
        if (this.count + 1 < 100) {
          this.count++
        }
      },
      addToCart () {
        // データベースアクセス
        firebase.database().ref('/cart_list/').push({
          name: this.product.name,
          price: this.product.price,
          thumbnailUrl: this.product.thumbnailUrl,
          janCode: this.product.janCode,
          count: this.count,
          addedAt: moment().format('YYYY/MM/DD HH:mm'),
        })
        .then(() => {
          this.$router.push({ name: 'cart_list' })
        })
      },
      backToTopMenu () {
        this.$router.push({ name: 'topmenu' })
      },
    },
    mounted () {
      this.searchProduct()
    }
  }
</script>

<style scoped>
  .detail-container {
    margin: 5vw;
  }
  .image-container {
    text-align: center;
  }
  .mainImage {
    width: 80vw;
  }
  .price-container {
    display: flex;
    text-align:center;
  }
  .price-content {
    width: 50%;
  }
  .cart-icon {
    font-size: 7vw;
    margin-right: 3vw;
  }
</style>
