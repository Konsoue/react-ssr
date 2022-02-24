import React from 'react';
import App from './App'
import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import NotFound from './containers/NotFound'

const routesList = [
  {
    path: '/',
    element: <App />,
    key: 'app',
    children: [
      {
        path: "",
        element: <Home />,
        loadData: Home.loadData,
        loadCSS: Home.loadCSS,
        key: 'home',
      },
      {
        path: "login",
        element: <Login />,
        key: 'login',
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />,
    key: 'notFound',
  }
];

export const renderRoutes = (routesList) => {
  return routesList.map((route) => {
    let childrenRoutes = [];
    if (route.children && route.children.length > 0) {
      childrenRoutes = renderRoutes(route.children);
    }
    const params = {
      ...route,
      children: childrenRoutes,
    }
    return <Route {...params} />
  })
}

export default routesList
