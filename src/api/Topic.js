const Api = rquire('./api.js')

module.exports = {
  /**
   * 获取主题首页
   * @param {Object} args 
   * page: Number
   * tab: String (ask, share, job, good)
   * limit: Number
   * mdrender: String String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
   */
  getTopics(args) {
    const data = {
      url: '/topics',
      params: {
        ...args
      }
    }
    return Api.get(data)
  },

  /**
   * 主题详情
   * @param {String} id 主体id
   * @param {String} accesstoken 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。
   * @param {*} mdrender 
   */
  getTopicDetails(id, mdrender=true) {
    const data = {
      accesstoken: true,
      url: `/topic/${id}`,
      params: {
        id, mdrender
      }
    }
    return Api.get(data)
  },

  /**
   * 新建主题
   * @param {Object} args 
   * tab: String
   * title: String
   * content: String
   * return { success: true, topic_id: '5433de4e...'}
   */
  postTopics(args) {
    const data = {
      url: '/topics',
      accesstoken: true,
      params: { ...args }
    }
    return Api.post(data)
  },

  /**
   * 编辑主题
   * @param {*} args Object
   * topic_id
   * title
   * tab: ask, share, job
   * content
   * return: 同上
   */
  updateTopics(args) {
    const data = {
      url: '/topics/update',
      accesstoken: true,
      params: {
        ...args
      }
    }
    return Api.post(data)
  },

  /**
   * 收藏主体
   * @param {*} topic_id 
   * return { success: true }
   */
  collectTopics(topic_id) {
    const data = {
      url: '/topic_collect/collect',
      accesstoken: true,
      params: { topic_id }
    }
    return Api.post(data)
  },

  /**
   * 取消收藏的主题
   * @param {*} topic_id 
   */
  decollectTopics(topic_id) {
    const data = {
      url: '/topic_collect/de_collect',
      accesstoken: true,
      params: { topic_id }
    }
    return Api.post(data)
  },

  /**
   * 用户收藏的主题
   * @param {*} name 
   */
  getTopicsCollect(name) {
    const data = {
      url: `/topic_collect/${name}`
    }
  }
};