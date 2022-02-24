# 服务端渲染 demo

## 使用方式

1. `npm run mock`: 开启服务器，用于 mock 数据
2. `npm run dev`: 开启开发模式，自动打包各个模块，生成文件。会开启代理服务器
3. `npm run build`: 打包，用于上线

## 已完成的功能

1. client 文件夹，是客户端渲染的入口文件
2. server 文件夹，是服务端渲染的入口文件，服务器 A
3. mock 文件夹，是客户端访问接口时，请求的服务器 B，上面的服务器 A 是代理服务器
4. containers 文件夹，是要写的网页
5. componet 文件夹，是公用的组件
6. store 文件夹，是用于创建 react-redux 的 store
7. App.jsx 是最顶层的 react 组件
8. Routes.jsx 是用 react-router-dom 来创建路由的

## 可完善的功能

- 使用 react-helmet 实现服务端渲染 meta，做 SEO 优化
- 使用 prerender 做预渲染，做 SEO 优化