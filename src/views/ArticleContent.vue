<template lang="html">
  <div class="content">
    <div class="article-details">
      <p>{{ topicDatas.title}}</p>
      <span class="author-url" ><img :src="topicDatas.author.avatar_url" alt=""></span>
      <span class="details">
        <span class="author-name" @click='checkAuthor(topicDatas.author.loginname)'>{{ topicDatas.author.loginname}}</span>
        <span class="good" v-if='topicDatas.top'>置顶</span>
        <span class="topic">{{ topicDatas.tab | formatTab}}</span><br />
        <span class="created-time"><span>发布于</span>{{topicDatas.create_at | formatTime}}</span>
        <span class="count">
          <span><i class="fa fa-comment-o" aria-hidden="true"></i>{{topicDatas.reply_count}}</span>
          <span><i class="fa fa-eye" aria-hidden="true"></i>{{topicDatas.visit_count}}</span>
        </span>
    </span>
    </div>
    <!-- <div class="article-content" v-html='topicDatas.content'></div> -->
    <topic-content></topic-content>
    <comment-list></comment-list>
    <bottom-bar></bottom-bar>
    <reply-box v-if='reply'></reply-box>
  </div>
</template>

<script>
import Bottombar from './BottomBar.vue';
import Content from './Content.vue';
import Comments from './Comment.vue';
import Reply from './Reply.vue';

export default {
  name: 'content',
  components: {
    'bottom-bar': Bottombar,
    'topic-content': Content,
    'comment-list': Comments,
    'reply-box': Reply,
  },
  asyncData({store, route}) {
    store.dispatch('FETCH_TOPIC_ITEM', route.params.id)
  },
  data () {
    return {
    }
  },
  computed: {
    topicDatas() {
      return this.$store.state.content
    }
  },
  mounted () {
    document.body.onclick = (e) => {
      e.stopPropagation();
      this.$store.dispatch('reply', false)
    }
    window.scrollTo(0, 0);
  },
  beforeDestroy () {
    this.$store.commit('SET_CONTENT', null)
  },
  methods: {
    checkAuthor (name) {
      axios.get(`https://cnodejs.org/api/v1/user/${name}`)
      .then( res => {
        console.log(res);
        this.$store.dispatch('checkUser', res.data.data)
        this.$router.push('/profile')
        this.$store.dispatch('isContent', false)
      })
      .catch(err => {
        console.log(err);
        toast('查看失败。', 100, 20, 1000)
      })
    }
  }
}
</script>

<style lang="css" scoped>
  div.content {
    box-sizing: border-box;
    width: 100%;
  }
  div.article-details {
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 15px 0 15px 15px;
  }
  div.article-details  p {
    font-weight: bold;
    font-size: 1em;
    box-sizing: border-box;
    color: #333;
    padding-right: 10px;
    margin-bottom: 10px;
  }
  div.article-details span.author-url {
    display: inline-block;
    width: 15%;
  }
  div.article-details span.author-name {
    color: #000;
  }
  div.article-details span {
    margin-right: 10px;
    vertical-align: middle;
    margin-bottom: 5px;
    font-size: 0.8em;
    color: #999;
    line-height: 1.5;
  }
  div.article-details span.topic {
    border: 1px solid #ddd;
    padding: 0 4px;
    border-radius: 4px;
    background-color: #ddd;
    color: #666;
    position: absolute;
    right: 10px;
  }
  div.article-details span.good {
    color: rgb(128, 189, 1);
    position: absolute;
    right: 50px;
  }
  div.article-details span.count {
    position: absolute;
    right: 0;
  }
    div.article-details span i {
      margin-right: 5px;
      color: #000;
    }
  div.article-details span img {
    width: 100%;
    border-radius: 50%;
  }
  div.article-details span.details {
    display: inline-block;
    padding: 0;
    margin: 0;
    width: 80%;
    position: relative;
  }

</style>
