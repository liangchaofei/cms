import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, ConfigProvider, Icon } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Employee from './employee';
import AddBlog from './addblog'
// import Setting from './setting';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;



const App = ({ match }: any) => {
  let defaultKey = match.url.replace('/', '') || 'employee';
  const [collapsed,toggle] = useState<boolean>(false)

  function toggleHandle () {
    toggle(!collapsed)
  }
  return <ConfigProvider locale={zh_CN}>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" id="blog_menu"  defaultSelectedKeys={[defaultKey]}>
            <Menu.Item key="employee"><Icon type="user" /><Link to="/employee">管理</Link></Menu.Item>
            <Menu.Item key="addblog"><Icon type="user" /><Link to="/addblog">增加</Link></Menu.Item>
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
          <Route path="/" exact component={Employee} />
          <Route path="/employee"  component={Employee} />
          <Route path="/addblog" component={AddBlog} />
        </div>
          </Content>
      </Layout>
    </Layout>
  </ConfigProvider>
}

export default App;
