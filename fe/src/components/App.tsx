import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, ConfigProvider, Icon,Dropdown } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Employee from './employee';
import AddBlog from './addblog';
import EditBlog from './editblog';
import Blog from './Blog';


import Home from './Home';
import Time from './Time'
import Login from './Login'
import Users from './Users'
import All from './All'
// import Setting from './setting';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;



const App = ({ match }: any) => {
  let defaultKey = match.url.replace('/', '') || 'admin';
  let isAdmin = match.url.indexOf('admin');
  let home_defaultKey = match.url.replace('/', '') || 'index';
  let isLogin = match.url.indexOf('login');
  let isReg = match.url.indexOf('reg');
  const [collapsed, toggle] = useState<boolean>(false)
  console.log('defaultKey', defaultKey)
  function toggleHandle() {
    toggle(!collapsed)
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/login">退出</Link>
      </Menu.Item>
    </Menu>
  );

  return <ConfigProvider locale={zh_CN}>
    {
      isLogin > -1 || isReg> -1 ?
      <Layout>
        <Content>
        <div className="content">
                <Route path="/login"  component={Login} />
              </div>
        </Content>
      </Layout>
      :
      isAdmin > -1 ?
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" id="blog_menu" defaultSelectedKeys={[defaultKey]}>
              <Menu.Item key="admin"><Icon type="user" /><Link to="/admin">文章管理</Link></Menu.Item>
              <Menu.Item key="admin_addblog"><Icon type="user" /><Link to="/admin_addblog">添加文章</Link></Menu.Item>
              <Menu.Item key="admin_users"><Icon type="user" /><Link to="/admin_users">用户管理</Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggleHandle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <div className="content">
                <Route path="/admin" exact component={Employee} />
                <Route path="/admin" component={Employee} />
                <Route path="/admin_addblog" component={AddBlog} />
                <Route path="/admin_editblog/:id" component={EditBlog} />
                <Route path="/admin_users" component={Users} />
              </div>
            </Content>
          </Layout>
        </Layout>
        :
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="index_logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
              defaultSelectedKeys={[home_defaultKey]}
            >
              <Menu.Item key="index"><Link to="/index">首页</Link></Menu.Item>
              <Menu.Item key="timeline"><Link to="/timeline">时间轴</Link></Menu.Item>
            </Menu>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#" style={{position: 'absolute',right: 0, top: 0}}>
                Hover me <Icon type="down" />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div style={{ padding: 24, minHeight: 380 }}>
                <Route path="/" exact component={Home} />
                <Route path="/index" component={Home} />
                <Route path="/blog/:id" component={Blog} />
                <Route path="/timeline" component={Time} />
                <Route path="/all" component={All} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@liangchaofei</Footer>
        </Layout>
    }

  </ConfigProvider>
}

export default App;
