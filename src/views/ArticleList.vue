<template lang="html">
  <div class="article-list">
    <div class="article" v-for='topic in topic_data'>
      <p class="title" @click='$router.push(`/topic/${topic.id}`)'>{{ topic.title }}</p>
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
    return {
      isBottom: false,
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    topic_data(){
      return this.$store.state.lists[this.type]
    }
  },
  watch: {
    'isBottom'(val) {
      if (val) {
        console.log(val);
        console.log(this.$store);
       const payload = this.$store.state.params
       console.log(payload);
       payload.page++
       this.$store.dispatch('FETCH_LIST', payload)
      }
    }
  },
  mounted() {
    window.onscroll = () => {
      this.bottom()
    }
  },
  methods: {
    bottom() {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight 
      const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      this.isBottom = clientHeight + scroll >= pageHeight
    },
    throttle (fn) {
      clearTimeout(fn.id);
      fn.id = setTimeout(fn, 200)
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
