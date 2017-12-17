<template lang="html">
  <div class="login">
    <label for="token">Token:</label><br />
    <input type="text" v-model.trim='token' id="token" placeholder='请输入accessToken'>
    <button type="button" id="btn" @click='login'>登录</button>
    <p>「用户登录后，在设置页面可以看到自己的accessToken。」</p>
    <p ref='alert' class='alert'></p>
  </div>
</template>

<script>
import axios from 'axios';
import toast from '../common/utils/toast'

export default {
  name: 'login',
  data () {
    return {
      token: '',
    }
  },
  mounted () {

  },
  methods: {
    login () {
      if (!this.token.length) {
        this.$refs.alert.textContent = '请输入正确的token。'
        setTimeout(() => {
          this.$refs.alert.textContent = ''
        }, 1000)
        return
      }
      axios.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: this.token})
      .then(res => {
        localStorage.setItem('user_id', res.data.id)
        localStorage.setItem('loginname', res.data.loginname)
        localStorage.setItem('avatar_url', res.data.avatar_url)
        localStorage.setItem('token', this.token)
        this.$store.dispatch('toggleLogin')
        toast('登录成功', 100, 20, 1000)
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
        this.$refs.alert.textContent = '登录失败，请检查token是否正确。'
        setTimeout(() => {
          this.$refs.alert.textContent = ''
        }, 2000)
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .login {
    /*height: 100%;*/
    margin-top: 150px;
    padding: 0 20px;
    /*background-color: #4cebb8;*/
  }
  /*不能设置上下内、外边距，可以设置左右边距*/
  label {
    /*display：block会出现很大的下边距*/
    display: inline-block;
    padding-bottom: 5px;
    font-size: 1.5em;
  }
  #token {
    height: 35px;
    outline: none;
    width: 95%;
    font-size: 1.2em;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: rgba(#999, 0.8);
    margin-bottom: 10px;
    box-shadow: inset -1px -1px #ddd, inset 1px 1px #ddd;
  }
  #token:focus {
    border: 1px solid #b5eef5;
  }
  #btn {
    width: 70px;
    height: 35px;
    line-height: 1.5;
    font-size: 1em;
    font-weight: bold;
    outline: none;
    letter-spacing: 5px;
    color: #fff;
    margin-left: 50%;
    transform: translateX(-35px);
    -webkit-transform: translateX(-35px);
    -ms-transform: translateX(-35px);
    -moz-transform: translateX(-35px);
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 3px;
    background-color: #61ccdd;
    border: 1px solid #ccc;
  }
  p.alert {
    text-align: center;
    color: #e6824b;
    margin-top: 10px;
  }
</style>
