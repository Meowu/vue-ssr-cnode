<template lang="html">
  <div class="inner-content" v-html='topicDatas.content'>
  </div>
</template>

<script>
export default {
  name: 'content',
  computed: {
    topicDatas() {
      return this.$store.state.content
    }
  }
}
</script>

<!-- 不带scoped！以便能把样式应用到动态注入的html。 -->
<style lang="css">
  div.inner-content {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    width: 100%;
    background: #fff;
    margin: 12px 0 10px;
    color: #000;
    padding: 5px;
  }
  div.inner-content div.markdown-text {
    width: 95%;
    margin: 0 auto;
  }
  div.inner-content h1, div.inner-content h2,div.inner-content h3, div.inner-content h4,div.inner-content h5, div.inner-content h6 {
    font-size: 1em;
    margin: 10px 0;
    /*font-weight: bold;*/
  }
  div.inner-content div.markdown-text ul li{
    box-sizing: border-box;
    list-style: inside;
    padding-left: 10px;
    font-size: 0.8em;
    margin-bottom: 10px;
  }
  div.inner-content div.markdown-text a{
    color: #3f608b;
  }
  div.markdown-text > p {
    font-size: 0.9em;
    margin: 10px 0;
    line-height: 1.6;
  }
  div.inner-content div.markdown-text img {
    /*display: block;*/
    width: 100%;
    margin: 10px auto;
  }
    /*div.markdown-text li img {
      display: block;
      width: 100%;
      margin: 10px auto;
    }*/
  div.inner-content div.markdown-text blockquote {
    color: #666;
    font-size: 0.9em;
  }
  div.inner-content div.markdown-text pre{
    box-sizing: border-box;
    /*width: 100%;*/
    padding: 10px 20px;
    background-color: #ccc;
    overflow: auto;
  }
  div.inner-content div.markdown-text code{
    word-break: break-all;
    color: #e73670;
  }
  table * {
    padding: 0;
    margin: 0;
  }
  div.inner-content div.markdown-text table{
    width: 100%;
    border: 1px solid #ccc;
    background-color: #eee;
    border-collapse: collapse;
    empty-cells: hide;
  }
  div.inner-content div.markdown-text table th, div.inner-content div.markdown-text table td {
    border: 1px solid #ccc;
    padding: 4px 10px;
    font-size: 1em;
    text-align: left;
  }
</style>
