import Vue from 'vue'
import { createApp} from './app'


Vue.mixin({
  beforeRouteUpdate (to, from, next) {

    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE_) {
  store.replaceState(window.__INITIAL_STATE_)
}

router.onReady(() => {

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
  })
  const prevMatched = router.getMatchedComponents(from)

  let diffed = false
  const activated =  matched.filter((c, i) => {
    return diffed || (diffed = (prevMatched[i] !== c))
  })
  const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
  if (!asyncDataHooks.length) {
    return next()
  }
  // 如果有状态栏则在这里开始。
  Promise.all(asyncDataHooks.map(hook => hook({store, route: to}))).then(() => {
    // 结束状态栏
    next()
  })

  app.$mount('#app')
})