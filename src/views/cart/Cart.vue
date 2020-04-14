<template>
  <div>
    <nav-bar class="nav-bar"><div slot="center">购物车{{cartLength}}</div></nav-bar>
    <cart-list :cart-list="cartList"></cart-list>
    <cart-buttom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList.vue'
  import CartButtomBar from './childComps/CartBottomBar'
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtomBar
    },
    computed: {
      ...mapGetters([
        'cartLength',
        'cartList',
        'cartCheckedLength'
      ])
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>