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
    <!-- <div class="loading" v-show='loading'>
      玩命加载中...
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'article-list',
  data () {
    return {}
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    // ...mapState(
    //   // limit: state => state.articles.limit,
    //   // page: state => state.articles.page,
    //   // currentTab: state => state.articles.currentTab,
    //   // loading: state => state.loading,
    //   // topic_data: state => state.articles.topic_data,
    //   // topic_data: state => state.lists[this.type]
    // })
    topic_data(){
      return this.$store.state.lists[this.type]
    }
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
    // readContent (id) {
    //   axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
    //   .then((res) => {
    //     this.$store.dispatch('renderContent', res.data.data)
    //     // this.$store.dispatch('articleList', res.data)
    //   })
    //   this.$store.dispatch('isLoading', false)
    //   this.$store.dispatch('isContent', true)
    //   this.$router.push(`/topics/content/${id}`)
    // }
  },
  created () {   // 方法和生命周期钩子中引用计算属性要加this
    // this.fetchData()
    console.log('create.');
    console.log(this.$store.state.lists.all);
  },
  filters: {
    formatTime: function (value) {
      let interval = Date.now() - Date.parse(value)
      if (interval / (1000*60*60*24*30*12) >= 1) {
        return `${parseInt(interval / (1000*60*60*24*30*12))}年前`
      } else if (interval / (1000*60*60*24*30) >= 1) {
        return `${parseInt(interval / (1000*60*60*24*30))}个月前`
      } else if (interval / (1000*60*60*24) >= 1) {
        return `${parseInt(interval / (1000*60*60*24))}天前`
      } else if (interval / (1000*60*60) >= 1) {
        return `${parseInt(interval / (1000*60*60))}小时前`
      } else if (interval / (1000*60) >= 1) {
        return `${parseInt(interval / (1000*60))}分钟前`
      }
    },
    formatTab: function (value) {
      switch (value) {
        case 'ask':
          return '问答';
          break;
        case 'share':
          return '分享';
          break;
        case 'good':
          return '精华';
          break;
        case 'job':
          return '招聘';
          break;
        case 'dev':
          return '测试';
          break;
        default:
          return '置顶';
      }
    },
  }
  // mounted () {
  //   window.onscroll = () => {
  //     this.throttle(this.asynData)
  //   }
  // },
  // beforeDestroy () {
  //   window.onscroll = null
  // }
}
</script>

<style lang="css">
  div.article-list {
    box-sizing: border-box;
    width: 100%;
    font-size: 0.9em;
    margin-top: 121px;
  }
  div.article {
    padding:  5px 10px;
    position: relative;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  div.article p.title {
    /* margin-bottom: 0 0 10px 0; */
    margin: 5px 0;
  }
  div.article-info a.user-image {
    display: inline-block;
    vertical-align: middle;
    width: 10%;
    margin-right: 8px;
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
