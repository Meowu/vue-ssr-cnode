const Api = require('./api')

module.exports = {

  /**
   * 获取用户详情
   * @param {String} name 
   */
  getUser(name) {
    const data = {
      url: `/user/${name}`,
      params: {}
    }
    return Api.get(data)
  },

  /**
   * 验证accesstoken的正确性
   * 匹配成功返回成功信息，否则403
   * return {success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}
   */
  postToken() {
    const data = {
      url: `/accesstoken`,
      accesstoken: true,
      params: {}
    }
    return Api.post(data)
  },

  /**
   * 获取未读消息数
   * return { data: 3 }
   */
  getMessageCount() {
    const data = {
      url: '/message/count',
      accesstoken: true,
      params: {}
    }
    return Api.get(data)
  },

  /**
   * 获取已读和未读消息
   * @param {*} mdrender 
   */
  getMessages(mdrender=true) {
    const data = {
      url: '/messages',
      accesstoken: true,
      params: {
        mdrender
      }
    }
  },

  /**
   * 标记全部已读
   * return { success: true,
   marked_msgs: [ { id: '544ce385aeaeb5931556c6f9' } ] }
   */
  markAll() {
    const data = {
      url: '/message/mark_all',
      accesstoken: true,
      params: {}
    }
    return Api.post(data)
  },

  /**
   * 标记单个已读
   * @param {*} id 
   * return {
      success: true,
      marked_msg_id: "58ec7d39da8344a81eee0c14"
    }
   */
  markOne(id) {
    const data = {
      url: `/message/mark_one/${id}`,
      accesstoken: true,
      params: {}
    }
    return Api.post(data)
  }
};