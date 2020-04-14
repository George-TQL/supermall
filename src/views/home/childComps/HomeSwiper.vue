<template>
  <div>
    <swiper ref="swiper" v-if="banners.length">
      <swiper-item v-for="(item, index) in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      startTimer() {
        this.$refs.Swiper && this.$refs.Swiper.startTimer()
      },
      stopTimer() {
        this.$refs.Swiper && this.$refs.Swiper.stopTimer()
      },
      imageLoad() {
        if(!this.isLoad) {
          this.$emit('swiperLoaded'),
          this.isLoad = true
        }
      }
    }
  }
</script>
