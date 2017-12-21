<template lang="html">
    <div class='reply'>
        <div class='content-box'>
            <textarea ref='focus'  v-model='content'  class='content'>
            </textarea>
            <button @click.stop='replied' type='button' class='btn'>
                回复
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'reply',
    data () {
        return {
            content: this.name,
        }
    },
    computed: {
    //     ...mapState({
    //     topicDatas: state => state.content.topic_content,
    //     reply_id: state => state.repliedId,
    //     tokens: state => state.token,
    //     name: state => state.commentName
    // })
  },
    mounted () {
        const textBox = document.querySelector('.content')
        textBox.onclick = function (e) {
            e.stopPropagation();
            // this.focus();
        }
    },
    methods: {
        replied () {
        //     console.log(this.reply_id);
        //     if (!this.reply_id) {
        //     this.content = '@' + this.name + ''
        //     console.log(this.content);
        // }
            this.$store.dispatch('reply', false)
            console.log(this.reply_id, this.tokens);
            if (!this.reply_id) {
                if (!this.content) {
                    toast('内容不能为空。', 200, 20, 1000)
                    return
                }
                this.axios.post(`https://cnodejs.org/api/v1/topic/${this.topicDatas.id}/replies`, {
                    accesstoken: '872a5148-c8dd-4afa-8100-137c29df2f55',
                    content: this.content,
                    reply_id: this.reply_id,
                })
                .then( res => {
                    toast('回复成功', 200, 30, 1000)
                    this.$router.push(`/topics/content/{topicDatas.id}`)
                })
                .catch( err => {
                    console.log(err);
                    toast('回复失败', 200, 20, 1000)
                })
            } else {
                if (!this.content) {
                    toast('内容不能为空。', 200, 20, 1000)
                    return
                }
                this.axios.post(`https://cnodejs.org/api/v1/topic/${this.topicDatas.id}/replies`, {
                    accesstoken: '872a5148-c8dd-4afa-8100-137c29df2f55',
                    content: this.content,
                })
                .then( res => {
                    this.$router.push(`/topics/content/{topicDatas.id}`)
                })
                .catch( err => {
                    console.log(err);
                    toast('回复失败', 200, 20, 1000)
                })
            }
        }
    }
}
</script>

<style lang="css"scoped>
    div.reply {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;  
    width: 100%;
    height: 100%;
    z-index: 999;
    /* opacity: 0.6; */
    /* -moz-opacity: 0.8; */
    background: rgba(0, 0, 0, 0.2);
    }
    div.content-box {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 200px;
    margin: auto;
    opacity: 1;
    filter: alpha(opacity=100);
    /* background-color: #fff; */
    }
    div.reply textarea {
    outline: none;
    border: 1px solid #75aec9;
    resize: none;
    padding: 5px;
    z-index: 1000;
    width: 300px;
    height: 200px;
    opacity: 1;
    }
    div.reply button {
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
    opacity: 1;
    z-index: 1000;
    }
</style>
