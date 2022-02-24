import { CHANGE_LIST } from './contants'

const defaultState = {
  name: 'konsoue',
  newList: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LIST:
      return {
        ...state,
        newList: action.list,
        isServer: action.isServer
      }
    default:
      return state
  }
}
