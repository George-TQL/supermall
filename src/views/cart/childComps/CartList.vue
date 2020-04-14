<template>
  <scroll class="cart-list" :data="[cartList]"> 
    <cart-list-item v-for="item in cartList" :key="item.iid" :itemInfo="item"></cart-list-item>
    <!-- <div v-for="(item, index) in cartList" :key="index">{{item}}</div> -->
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  

  export default {
    name:"CartList",
    components: {
      Scroll,
      CartListItem,
      
    },
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
  
</script>

<style scoped>
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 93px;
    left: 0;
    right: 0;
  }
</style>
