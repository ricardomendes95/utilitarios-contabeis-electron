/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import {
  FilePdfOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Logo } from './style';

import logo from '../../assets/img/logo.svg';

const { Footer, Sider, Content } = Layout;

interface MenuProps {
  selected?: '1' | '9' | '3' | '4';
  open?: 'sub1' | 'none';
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Sidebar: React.FC<MenuProps> = ({
  open = 'none',
  selected = '1',
  children,
}) => {
  const [state, setState] = useState({ collapsed: false });
  // const [selected, setSelected] = useState('')

  function onCollapse() {
    setState({
      collapsed: !state.collapsed,
    });
  }
  const { collapsed } = state;

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Link to="/">
            <Logo
              src={logo}
              alt="logo marca"
              height={!collapsed ? '85px' : '30px'}
            />
          </Link>

          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            selectedKeys={[selected]}
            defaultOpenKeys={[open]}
            mode="inline"
          >
            <Menu.SubMenu
              key="sub1"
              icon={<FilePdfOutlined />}
              title="Relatórios"
            >
              <Tooltip
                placement="rightTop"
                title="Carta de Responsabilidade da Administração"
              >
                <Menu.Item key="3" icon={<FilePdfOutlined />}>
                  <Link to="/cartaResponsabilidade">
                    Carta de Responsabilidade
                  </Link>
                </Menu.Item>
              </Tooltip>
            </Menu.SubMenu>
            <Menu.Item key="4" icon={<SyncOutlined />}>
              <Link to="/xlsxToOfx"> XLSX para OFX</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined />}>
              <Link to="/config">Configurações</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content>{children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Utilitários Contabéis ©2021 desenvolvido por TI Cont.
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
