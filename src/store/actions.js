import { Topic, User, Comment } from '../api'
export default {
  FETCH_LIST({commit, dispatch, state}, payload) {
    return Topic.getTopics(payload).then(res => {
      const type = payload.tab
      const topics = res.data.data
      console.log(topics.length);
      // console.log(type);
      commit('SET_LIST', {type, topics})
    }).catch(e => console.log(e))
  }
}