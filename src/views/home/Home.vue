<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="topTab" class="tab-control" v-show="showTabControl" @tabClick="tabClick"></tab-control>
    <scroll :probe-type="3"
            :pull-up-load="true"
            class="content"
            :data="[showGoodsList]"
            @pullingUp="loadMore"
            @scroll="contentScroll"
            ref="scroll">
      <home-swiper ref="hSwiper" :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control ref="contentTab"  class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar' 
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import TabControl from 'components/content/tabControl/TabControl'
  import FeatureView from './childComps/FeatureView'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import {getMultiData, getProductData} from 'network/home'
  import {debounce} from '../../common/utils'

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []}
        },
        currentType: 'pop',
        showBackTop: false,
        saveY: 0,
        tabOffsetTop: 0,
        showTabControl: false
      }
    },
    computed: {
      showGoodsList() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 请求轮播数据
      this._getMultiData()

      // 请求商品数据
      this._getProductData('pop')
      this._getProductData('new')
      this._getProductData('sell')
      
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('homeItemImgLoad', () => {
        refresh()
      })
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scrollY
      
    },
    methods: {

      // 网络请求
      _getMultiData() {
        getMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      _getProductData(type) {
        // 获取页码
        const page = this.goods[type].page
        getProductData(type, page).then(res => {
          const newList = res.data.list
          this.goods[type].list.push(...newList)
          this.goods[type].page +=1
          // console.log(this.goods[type].list);
          
          this.$refs.scroll.finishedPullUp()
        })
      },
      // tabcontrol事件监听
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }

        this.$refs.contentTab.currentIndex = index
        this.$refs.topTab.currentIndex = index
      },
      loadMore() {
        this._getProductData(this.currentType)
      },
      contentScroll(position) {
        this.showBackTop = position.y <= -1000
        this.showTabControl = position.y <= -this.tabOffsetTop
      },
      swiperLoaded() {
        this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop
        
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0)
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    position: relative;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>