export default {
  SET_LIST(state, {type, topics}) {
    state.lists[type] = topics
  },
  MORE_LIST(state, {type, topics}) {
    state.lists[type] = state.lists[type].concat(topics)
  },
  SET_PARAMS(state, payload) {
    state.params = payload
  },
  TOGGLE_NAVBAR(state, val) {
    state.showNavbar = val
  },
  SET_DETAILS(state, content) {
    state.content = content
  }
}