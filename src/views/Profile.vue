<template lang="html">
  <div class="profile">
    <span class="avatar_url"><img :src="avatar_url" alt="avatar_url"></span>
    <span class="user_name"><label>用户名:</label>{{ userName }}</span>
    <span class="create-time"><label>创建时间:</label>{{create_at | formatTime}}</span>
    <span class="github"><label><i class="fa fa-github" aria-hidden="true"></i>:</label><a :href="githubLink+githubName">{{githubName}}</a></span>
    <span class="score"><label>Score:</label>{{score}}</span>
    <button type="button" id="logout" @click='logOut' v-if='userName===loginname'>退出登录</button>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'Profile',
  data () {
    return {
      githubLink: "https://github.com/"
    }
  },
  computed: {
    ...mapState({
      userName: state => state.user.username,
      avatar_url: state => state.user.avatar_url,
      githubName: state => state.user.githubUsername,
      score: state => state.user.score,
      create_at: state => state.user.create_at,
      loginname: state => state.loginname
    })
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
      localStorage.removeItem('user_id')
      localStorage.removeItem('loginname')
      localStorage.removeItem('avatar_url')
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
  div.profile {
    width: 100%;
    margin-top: 120px;
  }
  div.profile span{
    display: block;
    width: 80%;
    /*text-align: center;*/
    margin: 0 auto 20px;
    /*margin-bottom: 20px;*/
  }
  div.profile span label {
    /*变为块元素才可以设置大小然后右对齐！！！！*/
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 20px;
    font-size: 1.2em;
  }
  div.profile span a {
    text-decoration: none;
    color: #666;
  }
  div.profile span.avatar_url {
    text-align: center;
  }
  div.profile span.avatar_url img{
    border-radius: 10px;
    width: 150px;
    /*height: 100px;*/
  }
  button#logout {
    /*box-sizing: border-box;*/
    width: 120px;
    height: 40px;
    line-height: 2;
    font-size: 1em;
    font-weight: bold;
    outline: none;
    color: #fff;
    margin-left: 50%;
    transform: translateX(-60px);
    -webkit-transform: translateX(-60px);
    -ms-transform: translateX(-60px);
    -moz-transform: translateX(-60px);
    margin-top: 10px;
    letter-spacing: 4px;
    border-radius: 3px;
    background-color: #47b8c8;
    border: 1px solid #ccc;
  }
</style>
