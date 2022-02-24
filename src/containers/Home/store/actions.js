import { CHANGE_LIST } from './contants'

const changeList = (list, isServer) => ({
  type: CHANGE_LIST,
  list,
  isServer
})

export const getHomeList = (isServer = false) => {
  return async (dispatch, getState, axiosInstance) => {

    const res = await axiosInstance('/api/list');
    const list = res.data || [];
    dispatch(changeList(list, isServer));
  }
}
