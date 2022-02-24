import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getClientStore } from '../store'
import routesList, { renderRoutes } from '../Routes'

const Root = () => {
  return (
      <Provider store={getClientStore()}>
        <BrowserRouter location={'/'}>
          <Routes>
            {renderRoutes(routesList)}
          </Routes>
        </BrowserRouter>
      </Provider>
  )
}

ReactDOM.hydrate(<Root />, document.getElementById('root'));