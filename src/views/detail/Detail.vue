<template>
  <div id="detail">
    <detail-navbar class="detail-nav" @itemClick="selectIndex" ref="nav"></detail-navbar>
    <scroll class="content" 
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="goodsList" ref="recommend"></goods-list>
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>


<script>
  import DetailNavbar from './childComps/DetailNavbar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetaiParamInfo'
  import DetailCommentInfo from './childComps/DetaiCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import GoodsList from 'components/content/goods/GoodsList'
  import {backTopMixin} from 'common/mixin.js'
  import {getDetailData, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {mapActions} from 'vuex';

  export default {
    name: "Detail",
    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar 
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        goodsList: [],
        themeTops: [],
        currentIndex: 0
      }
    },
    created() {
      // 获取id
      this.iid = this.$route.params.iid
      // 请求数据
      getDetailData(this.iid).then(res => {
        // console.log(res);
        // 获取数据
        const data = res.result
        // 获取顶部图片数据
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详细信息
        this.detailInfo = data.detailInfo
        // 保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 保存评论数据
        if(data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
        // 保存推荐数据
        // this.goodsList = data.list
      })
      getRecommend().then(res => {
        this.goodsList = res.data.list
      })

    },
    methods: {
      ...mapActions({
        addCart: 'addToCart'
      }),
      imgLoad() {
        this.$refs.scroll.refresh()

        // 获取对应的offsetTop
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTops.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTops.push(Number.MAX_VALUE)
        // console.log(this.themeTops);
        
      },
      selectIndex(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 300)
      },
      contentScroll(position) {
        this._listenScrollTheme(-position.y)
        this.showBackTop = (position.y <= -1000)
      },
      _listenScrollTheme(position) {
        let length = this.themeTops.length
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i];
          if (position >= iPos && position < this.themeTops[i+1]) {
            if(this.currentIndex !==i) {
              this.currentIndex = i
              // console.log(i);
              this.$refs.nav.currentIndex = i
            }
            break;
          }
        }
      },
      addToCart() {
        // 将商品添加到Store中
        const obj = {}
        obj.iid = this.iid
        obj.imgUrl = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        this.addCart(obj).then(res => {
          this.$toast({message: res})
          // console.log(this.$toast);
          // console.log(res);
          
        })
        
      }
    },
  }

</script>

<style scoped>
  #detail {
    background-color: #fff;
    z-index: 9;
    position: relative;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
</style>
