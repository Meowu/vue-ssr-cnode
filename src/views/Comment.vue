<template lang="html">
  <div class="comment-list" ref='comment'>
    <div class="comment" v-for='(reply, index) in topicDatas.replies'>
      <div class="header">
        <span class="author-url"><img :src="reply.author.avatar_url" alt=""></span>
        <span class="comment-info">
          <span class="author-name" @click='checkAuthor(reply.author.loginname)'>{{reply.author.loginname}}</span><span>#{{index + 1}}</span>
          <span class='reply' @click.stop='replyComment(reply.author.loginname, reply.id, topicDatas.id)'>回复</span><br />
          <span class="created-time">{{reply.create_at | formatTime}}</span>
        </span>
      </div>
      <div class="comment-content" v-html='reply.content'></div>
      <reply-box v-if='replied'></reply-box>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import toast from '../common/utils/toast';
import axios from 'axios';
import Reply from './Reply';

export default {
  name: 'comment',
  components: {
    'reply-box': Reply
  },
  computed: {
    ...mapState({
      topicDatas: state => state.content.topic_content,
      replied: state => state.reply
    })
  },
  mounted () {
    if (!this.topicDatas.replies.length) {
      this.$refs.comment.textContent = '暂无回复'
      this.$refs.comment.style.backgroundColor = '#eee'
      this.$refs.comment.style.textAlign = 'center'
      this.$refs.comment.style.coloe = '#ccc'
    }
  },
  methods: {
    checkAuthor (name) {
      // this.$store.dispatch('checkUser', name)
      // this.$router.push('/profile')
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
    },
    replyComment(commentName, commentId, topicId) {
      window.scrollTo(0, 0)
      this.$store.dispatch('reply', true)
      this.$store.dispatch('displayCommentName', commentName)
      this.$store.dispatch('repliedIsComment', commentId)
      // document.documentElement.style.backgroundColor = '#ddd'
    }
  }
}
</script>

<style lang="css">
  div.comment-list {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    /*padding: 10px;*/
    margin-bottom: 45px;
  }
  div.comment-list div.comment {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    padding: 5px 10px 0 10px;
  }
  div.comment-list div.header span {
    /*display: inline-block;*/
    margin-right: 10px;
    vertical-align: baseline;
    /*margin-bottom: 5px;*/
    color: #888;
    font-size: 0.8em;
  }
  div.comment-list div.header span.author-name {
    font-size: 1em;
    color: #000;
  }
  div.comment-list div.header span.author-url {
    width: 10%;
    /* 变成块元素后面的img才能继承它的宽度。*/
    display: inline-block;
  }
  div.comment-list div.header span.comment-info {
    display: inline-block;
    line-height: 1.5;
  }
  div.comment-list div.header span.author-url img{
    width: 100%;
    border-radius: 50%;
  }
  div.comment-list div.markdown-text {
    font-size: 0.9em;
    padding: 0 0 5px 20px;
  }
  div.comment-list div.markdown-text a {
    color: #4283ac;
  }
  div.comment-list div.markdown-text img {
    width: 100%;
  }
  div.comment-list div.markdown-text pre {
        word-break: break-all;
        color: #e73670;
        overflow: auto;
  }
  div.comment-list div.header span.reply {
    position: absolute;
    right: 10px;
    letter-spacing: 3px;
  }
</style>
