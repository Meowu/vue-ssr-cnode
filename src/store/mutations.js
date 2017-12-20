export default {
  SET_LIST(state, {type, topics}) {
    state.lists[type] = state.lists[type].concat(topics)
  },
  SET_PARAMS(state, payload) {
    state.params = payload
  }
}