import { Topic, User, Comment } from '../api'
export default {
  FETCH_LIST({commit, state}, payload) {
    return Topic.getTopics(payload).then(res => {
      const type = payload.tab
      const topics = res.data.data
      commit('SET_PARAMS', payload)
      commit('SET_LIST', {type, topics})
    }).catch(e => e)
  },
  FETCH_MORE({commit, state}, payload) {
    return Topic.getTopics(payload).then(res => {
      const type = payload.tab
      const topics = res.data.data
      commit('SET_PARAMS', payload)
      commit('MORE_LIST', {type, topics})
    }).catch(e => e)
  },
  FETCH_TOPIC_ITEM({commit, state}, id) {
    Topic.getTopicDetails(id).then(res => {
      const details = res.data.data
      commit('SET_DETAILS', details)
      commit('TOGGLE_NAVBAR', false)
    })
  }
}