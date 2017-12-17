<template lang="html">
  <div class="bottom-bar">
    <span @click='backward'><i class="fa fa-arrow-left" aria-hidden="true"></i></span>
    <span @click='backTop'><i class="fa fa-arrow-up" aria-hidden="true"></i></span>
    <span @click='mark'><i class="fa fa-bookmark-o" aria-hidden="true"></i></span>
    <span @click.stop='reply'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
  </div>
</template>

<script>
import toast from '../common/utils/toast';

export default {
  name: 'bottom-bar',
  computed: {
    // reply
  },
  methods: {
    backward () {
      this.$router.go(-1)
      this.$store.dispatch('isContent', false)
    },
    reply () {
      window.scrollTo(0, 0)
      this.$store.dispatch('reply', true)
    },
    backTop () {
      var timer
      var pageY = window.pageYOffset
      let y = Math.floor(pageY / 20)
      timer = setInterval(() => {
        window.scrollBy(0, -y)
        // pageY = window.pageYOffset
        pageY = window.pageYOffset;
        if (pageY <= 0) {
          clearInterval(timer)
        }
      }, 10)

      toast('收藏成功', 100, 20, 1200);
    },
    mark () {
      // this.$router.go(0)
      // window.location.reload()
    }
  }
}
</script>

<style lang="css" scoped>
  .bottom-bar {
    box-sizing: border-box;
    border: 1px solid #999;
    position: fixed;
    background-color: #eee;
    bottom: 0;
    display: flex;
    width: 100%;
    text-align: center;
    box-shadow: 0 -1px 3px #888;
  }
  .bottom-bar span {
    vertical-align: top;
    font-size: 1.2em;
    padding: 10px 20px;
    flex: 1 1 auto;
    /*width: 33.333%;*/
  }
  .bottom-bar i {
    color: #2d2a2a;
    font-weight: 200;
  }
</style>
