
const Vue = require('vue')
const server = require('express')()
const render = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('index.template.html', 'utf-8') // 必须指定编码
})

// 也可以与 Vue 应用程序实例共享 context 对象，允许模板插值中的组件动态地注册数据。
const context = {
  title: 'Vue-SSR'
}
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    // renderer只从Vue程序中渲染出html内容，所以我们需要提供完整的页面标签，为了简化工作，可以在创建renderer时提供一个页面模版，vue实例的内容会注入到模版中并渲染成一个完整有效的页面。
    template: `<p>Current request url is {{ url }}</p>` 
    // 使用双大括号来进行转义插值，这是在Vue实例内，使用 ${url}会报错url是undefined。貌似不支持{{{}}}插值，只有模版才行？
  })
  render.renderToString(app, context, (err, html) => {
    if (err) {
      res.sendStatus(500).end('Internet Server Error.')
      return 
    }
    res.send(html)
  })
})
server.listen(8080, () => console.log('Server listening on: 8080'))
