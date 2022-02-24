import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store'
import clientAxios from '../client/request'
import createServerAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer
})

// 避免所有用户共享一份服务器的单例 store
// 所以使用方法，去创建 store
export const getStore = (req) => {
  const serverAxios = createServerAxios(req);
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
  // window.__PRELOADED_STATE__ 是在 服务器文件夹中，添加的代码
  const defaultState = window.__PRELOADED_STATE__;
  const store = createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
  delete window.__PRELOADED_STATE__;
  return store;
}