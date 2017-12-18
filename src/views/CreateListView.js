import ArticleList from './ArticleList.vue'

const camelize = id => id.chatAt(0).toUppercase() + id.slice(1)

export default (type) =>  {
  return {
    name: `${camelize(type)}List`,

    asyncData({store, route}) {
      store.dispatch('FETCH_LIST', { type })
    },

    title: {camelize(type)},

    render(h) {
      return h(ArticleList, {props: {type}})
    }
  }
};
