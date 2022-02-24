import express from 'express';
import { render } from './utils'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-dom'
import routesList from '../Routes';
import { getStore } from '../store'
import { handleStyle } from './utils'

const app = express()
const port = 3000;

app.use(express.static('public'))

app.use('/api', proxy('http://localhost:5000', {
  proxyReqPathResolver: req => '/api' + req.url
}));

app.get('*', (req, res) => {
  let store = getStore(req);
  // 结合当前用户请求地址 和 路由，做数据获取
  const routes = matchRoutes(routesList, req.url);
  const promises = [];
  routes.forEach(matchRoute => {
    const { route } = matchRoute;
    if (route.loadData) {
      const promise = new Promise((resolve) => {
        route.loadData(store).then(resolve).catch(resolve);
      })
      promises.push(promise);
    }
    if (route.loadCSS) {
      const promise = new Promise((resolve) => {
        route.loadCSS().then(res => {
          const content = res._getContent().default;
          const source = handleStyle(content)
          resolve(source);
        }).catch(resolve);
      })
      promises.push(promise);
    }
  })

  Promise.all(promises).then((results) => {
    const html = render(store, routesList, req.url, results);
    res.send(html);
  }).catch(err => {
    const html = render(store, routesList, req.url, []);
    res.send(html);
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})