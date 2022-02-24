import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { getHomeList } from './store/actions'
// 同构：一套 React 代码，在服务器端执行一次，在客户端执行一次

class Home extends Component {
  componentDidMount() {
    const { getList, serverFetched, list } = this.props;
    if (!serverFetched && !list.length) getList()
  }
  render() {
    return (
      <div>
        <div className='home'>hello {this.props.name}</div>
        <button onClick={() => alert(55)}>click</button>
        {
          this.props.list.map((item) => {
            return <div key={item.id}>{item.name}</div>
          })
        }
        <Outlet />
      </div>
    )
  }
}

// 这个函数负责，负责在服务端渲染之前，把这个路由的需要的数据提前加载好
Home.loadData = store => store.dispatch(getHomeList(true));

Home.loadCSS = () => import('./index.css')

const mapStateToProps = (state) => ({
  name: state.home.name,
  list: state.home.newList,
  serverFetched: state.home.isServer
})

const mapDispatchToProps = (dispatch) => ({
  getList() {
    dispatch(getHomeList())
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)