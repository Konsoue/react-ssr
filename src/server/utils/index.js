import React from 'react';
import { renderToString } from 'react-dom/server'
import { Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux'
import { renderRoutes } from '@/Routes'

export const handleStyle = (content) => {
  const type = Object.prototype.toString.call(content).slice(8, -1);
  if (type !== 'Array') return '';
  let source = content[0][1];
  const locals = content['locals'];
  for (let key in locals) {
    source = source.replace(locals[key], key);
  }
  return source;
}


export const render = (store, routesList, url, cssStyle) => {
  // 让 routes 中的路由，执行 loadData 执行一次
  const css = `${cssStyle.map(item => (item ? `<style>${item}</style>` : ''))}`.replace(',', '')

  const preloadedState = store.getState();
  const content = renderToString((
    <Provider store={store}>
      <StaticRouter location={url} >
        <Routes>
          {renderRoutes(routesList)}
        </Routes>
      </StaticRouter>
    </Provider>
  ));

  return `
    <html>
      <head>${css}</head>
      <body>
        <div id="root">${content}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
        <script src="index.js"></script>
      </body>
    </html>
  `;
}