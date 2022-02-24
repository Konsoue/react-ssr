import axios from "axios";

// node 服务器需要转发一些请求信息，需要接受客户端的 request 报文信息
const createInstance = (request) => {
  return axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      cookie: request.get('cookie') || '',
    }
  })
}

export default createInstance
