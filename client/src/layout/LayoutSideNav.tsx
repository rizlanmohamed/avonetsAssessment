import React, { useState, ReactNode } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
  BorderlessTableOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, useLocation  } from 'react-router-dom';

type LayoutSideNavProps = {
  children: ReactNode;
};

const { Header, Sider, Content } = Layout;

const LayoutSideNav: React.FC<LayoutSideNavProps> = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const location = useLocation();
  const selectedKey = location.pathname;

  //console.log("location.pathname", location.pathname)

  return (
    <Layout style={{height: '100svh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="/" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/expenses" icon={<BorderlessTableOutlined />}>
            <Link to="/expenses">Expenses</Link>
          </Menu.Item>
          <Menu.Item key="/nav3" icon={<UploadOutlined />}>
            <Link to="/nav3">404 Page</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutSideNav;