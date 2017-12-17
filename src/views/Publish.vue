<template lang="html">
  <div class="publish">
    <h4>发布新话题</h4>
    <span>选择版块：
    <select v-model='selectedTab' class="tab-name" id="tab">
      <!-- selected在这里不生效，value值需要跟v-model绑定的数据属性相同 -->
      <option v-for='tab in tabs' :value='tab.value'>{{ tab.text }}</option>
    </select>
    </span><br />
    <span>
      <label for="title">标题：</label><input v-model='title' type="text" id="title" placeholder='标题10字数以上'>
    </span>
    <textarea v-model='content' name="content" rows="8" id='content'></textarea>
    <button type="button" id="btn" @click='publish'>发表</button>
  </div>
</template>

<script>
import axios from 'axios'
import toast from '../common/utils/toast'

export default {
  name: 'publish',
  data () {
    return {
      selectedTab: '',
      title: '',
      content: '',
      tabs: [
        {value: '', text: '选择'},
        {value: 'ask', text: '问答'},
        {value: 'share', text: '分享'},
        {value: 'job', text: '工作'},
        {value: 'dev', text: '测试'}
      ]
    }
  },
  computed: {
    getToken () {
      return this.$store.state.token
    }
  },
  methods: {
    publish () {
      if (!this.getToken) {
        toast('请先登录。', 200, 20, 1000)
        return 
      }
      axios.post('https://cnodejs.org/api/v1/topics', {
        accesstoken: this.getToken,
        tab: this.selectedTab,
        title: this.title,
        content: this.content
      })
      .then( res => {
        toast('发表成功', 200, 20, 1000)
        console.log(res);
        this.$router.push(`/`)
      })
      .catch( err => {
        console.log(err)
        toast('发表失败', 200, 20, 1000)
      })
    }
  }
}
</script>

<style lang="css" scoped>
  div.publish {
    width: 100%;
    margin-top: 100px;
    padding: 15px;
    box-sizing: border-box;
  }
  div.publish h4 {
    text-align: center;
    margin-bottom: 10px;
  }
  div.publish span {
    line-height: 2;
    font-size: 1.2em;
  }
  div.publish select {
    width: 120px;
    height: 30px;
    padding-left: 5px;
    outline: none;
    font-size: 1em;
    color: #666;
    border: 1px solid #75aec9;
    border-radius: 2px;
  }
  div.publish span input  {
    outline: none;
    height: 25px;
    margin: 10px 0;
    border: 1px solid #75aec9;
    padding-left: 5px;
    font-size: 1em;
  }
  div.publish textarea {
    margin-top: 10px;
    width: 95%;
    outline: none;
    border: 1px solid #75aec9;
    resize: none;
    padding: 5px;
    height: 300px;
  }
  div.publish button {
    width: 60px;
    height: 40px;
    line-height: 2;
    font-size: 1em;
    font-weight: bold;
    outline: none;
    color: #fff;
    margin-left: 50%;
    transform: translateX(-30px);
    -webkit-transform: translateX(-30px);
    -ms-transform: translateX(-30px);
    -moz-transform: translateX(-30px);
    margin-top: 10px;
    background-color: #2db4c7;
    border: 1px solid #ccc;
  }
</style>
