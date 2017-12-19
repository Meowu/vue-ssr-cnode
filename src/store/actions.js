import { Topic, User, Comment } from '../api'
export default {
  async FETCH_LIST({commit, dispatch, state}, payload) {
    console.log("FETCH");
    const res = await Topic.getTopics(payload)
    const type = payload.type
    const topics = res.data
    commit('SET_LIST', {type, topics})
  }
}