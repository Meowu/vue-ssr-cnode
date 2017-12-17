<script>
  import NavBar from './views/Navbar.vue'
  export default {
    components: {
      'nav-bar': NavBar
    }
  }
</script>
<template>
  <div id='app'>
    <!-- <p>Welcome to Vue SSR.</p> -->
    <nav-bar />
    <router-view></router-view>
  </div>
</template>
<style lang="stylus">
  body
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    font-size 15px
    background-color lighten(#eceef1, 30%)
    margin 0
    padding-top 55px
    color #34495e
    overflow-y scroll
  #app 
    font-family 'Avenir',  Helvetica, '微软雅黑', Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    word-break break-all
  /*word-wrap: break-word;*/
</style>