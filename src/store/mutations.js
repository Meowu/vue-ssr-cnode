export default {
  SET_LIST(state, {type, topics}) {
    state.lists[type] = topics
    console.log(state.lists[type]);
    console.log(topics[0]);
  }
}