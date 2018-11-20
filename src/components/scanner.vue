<template>
  <TopMenuButton
    icon="fa-barcode"
    :label="$t('scan_barcode.title')"
    @on-clicked="scanBarcode"
  ></TopMenuButton>
</template>

<script>
  import TopMenuButton from './TopMenuButton'

  export default{
    name: 'Scanner',
    components: {
      TopMenuButton
    },
    data() {
      return {
        product: {},
      }
    },
    methods: {
      scanBarcode () {
        // プラグインを使ってバーコードを読み取る
        window.plugins.barcodeScanner.scan(this.scanSuccess, this.scanFail)
      },
      scanSuccess (result) {
        // 読み取り成功時に呼び出される
        this.$emit('scan-completed', result.text)
      },
      scanFail (error) {
        // 読み取り失敗時に呼び出される
        alert("Scanning failed: " + error);
      }
    }
  }
</script>
