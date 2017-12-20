import { Topic, User, Comment } from '../api'
export default {
  FETCH_LIST({commit, dispatch, state}, payload) {
    return Topic.getTopics(payload).then(res => {
      const type = payload.tab
      const topics = res.data.data
      commit('SET_PARAMS', payload)
      commit('SET_LIST', {type, topics})
    }).catch(e => console.log(e))
  }
}