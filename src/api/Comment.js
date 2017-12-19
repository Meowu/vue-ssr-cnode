const Api = require('./api')

module.exports = {

  /**
   * 新建评论
   * @param {*} id 主题的id
   * @param {*} args 
   * content
   * reply_id：如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
   * return { success: true, reply_id: '5433...'}
   */
  postReplies(id, args) {
    const data = {
      url: `/topic/${id}/replies`,
      accesstoken: true,
      params: {
        // ...args
      }
    }
    return Api.post(data)
  },

  /**
   * 为评论点赞
   * @param {*} id 
   * 接口会自动判断用户是否已经点赞，并且进行取消赞或者点赞
   * return { success: true, action: 'down'}
   */
  upReplies(id) {
    const data = {
      url: `/reply/${id}/ups`,
      accesstoken: true,
      params: {}
    }
    return Api.post(data)
  }
};