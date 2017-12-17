<template lang="html">
  <div class="article-list">
    <div class="article" v-for='topic in topic_data'>
      <p class="title" @click='readContent(topic.id)'>{{ topic.title }}</p>
      <div class="article-info">
        <a href="#" class="user-image"><img :src="topic.author.avatar_url" alt="userimage"></a>
        <p class="reply-time">
          <span class="author-name">{{ topic.author.loginname}}</span><br />
          <span>最后回复于</span><span>{{topic.last_reply_at | formatTime}}</span>
          <span><i class="fa fa-comment-o" aria-hidden="true"></i></span><span class="comments">{{topic.reply_count}}</span>
        </p>
        <span class="topic" v-show='topic.tab' :class="{top: topic.top}" >{{ topic.top? topic.top:topic.tab | formatTab}}</span>
      </div>
    </div>
    <div class="loading" v-show='loading'>
      玩命加载中...
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
import toast from '../common/utils/toast'

export default {
  name: 'article-list',
  data () {
    return {
    }
  },
  computed: {
    ...mapState( {
      limit: state => state.articles.limit,
      page: state => state.articles.page,
      currentTab: state => state.articles.currentTab,
      topic_data: state => state.articles.topic_data,
      loading: state => state.loading,
    }),
  },
  methods: {
    fetchData () {
        axios.get(`https://cnodejs.org/api/v1/topics?tab=${this.currentTab}&page=${this.page}&limit=${this.limit}`)
        .then((res) => {
          this.$store.dispatch('initData', res.data.data)
          // this.$store.dispatch('articleList', res.data)
        })
    },
    throttle (fn) {
      clearTimeout(fn.id);
      fn.id = setTimeout(fn, 200)
    },
    asynData () {
      let x = window.pageXOffset
      let y = window.pageYOffset
      localStorage.setItem('pageX', x)
      localStorage.setItem('pageY', y)
      // 存在一个问题，到了底部之后如果继续拖动，会反复触发请求数据，暂未解决。
      if (document.documentElement.scrollHeight - window.pageYOffset === document.documentElement.clientHeight) {
        this.$store.dispatch('isLoading', true)
        this.$store.dispatch('changeLimit')
        axios.get(`https://cnodejs.org/api/v1/topics?tab=${this.currentTab}&page=${this.page}&limit=${this.limit}`)
        .then((res) => {
          this.$store.dispatch('initData', res.data.data)
          this.$store.dispatch('isLoading', false)
          // this.$store.dispatch('articleList', res.data)
        })
      } else {
        this.$store.dispatch('isLoading', false)
      }
    },
    readContent (id) {
      axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
      .then((res) => {
        this.$store.dispatch('renderContent', res.data.data)
        // this.$store.dispatch('articleList', res.data)
      })
      this.$store.dispatch('isLoading', false)
      this.$store.dispatch('isContent', true)
      this.$router.push(`/topics/content/${id}`)
    }
  },
  created () {   // 方法和生命周期钩子中引用计算属性要加this
    this.fetchData()
  },
  watch: {
    // 再次点击同一个tab，由于路由不变数据不会重新渲染
    // 并且由于在点击事件中设置了scrollTo(0, 0)，会直接返回顶部
    '$route.params.tab' () {  //路由变化，重新渲染数据以便复用组件，不带this。
      this.fetchData()
      // toast()
    }
  },
  mounted () {
    window.onscroll = () => {
      this.throttle(this.asynData)
    }
  },
  beforeDestroy () {
    window.onscroll = null
  }
  // activated () {
  //   axios.get(`https://cnodejs.org/api/v1/topics?tab=${this.currentTab}&page=${this.page}&limit=${this.limit}`)
  //   .then((res) => {
  //     this.$store.dispatch('initData', res.data.data)
  //     // this.$store.dispatch('articleList', res.data)
  //   })
  // }
}
</script>

<style lang="css">
  div.article-list {
    box-sizing: border-box;
    width: 100%;
    font-size: 0.9em;
    margin-top: 100px;
  }
  div.article {
    padding: 10px;
    position: relative;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  div.article p.title {
    margin-bottom: 10px;
  }
  div.article-info a.user-image {
    display: inline-block;
    vertical-align: middle;
    width: 10%;
  }
  a.user-image img {
    border-radius: 50%;
    width: 100%;
  }
  p.reply-time {
    flex: 1 1 80%;
  }

  div.article-info p{
    vertical-align: middle;
    display: inline-block;
  }
  div.article-info span {
    font-size: 0.8em;
    margin-right: 5px;
    color: #ccc;
  }
  i {color: #ccc;}
  div.article-info span.author-name {
    font-size: 1em;
    color: #000;
  }
  div.article div.article-info span.top {
    background-color: #80bd01;
    color: #fff;
  }
  div.article-info span.topic {
    position: absolute;
    border: 1px solid #ccc;
    padding: 2px 6px;
    border-radius: 3px;
    background-color: #eee;
    right: 5px;
    bottom: 10px;
    color: #666;
  }
  div.loading {
    text-align: center;
    background-color: #ddd;
    padding: 5px;
    font-size: 1em;
    font-weight: lighter;
  }
</style>
