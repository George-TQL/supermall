import BackTop from 'components/content/backtop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    }
  },
}