import '../App.css'; 
import { useState } from 'react'; 
import MenuLateral from './ListaMenu';
import '../index'; 
import Logo from './Logo';
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Sider, Content } = Layout; 

function AppLayout(conteudo) { 

  const [collapsed, setCollapsed] = useState(false); 

  return (
    <>
      <Layout>
        <Layout>
          <Sider width={230} collapsed={collapsed} collapsible trigger={null} className="sidebar">
            <Logo />
            <MenuLateral />
          </Sider>
          <div className="toggle-wrapper">
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </div>
          <Content className="content-wrapper" style={{
            padding: '20px',
            overflow: 'auto',
            height: '100vh'
          }}>
            <main className="content" style={{
              flex: 1,
              overflowY: 'auto',
            }}>{conteudo.children}</main>
          </Content>
        </Layout>
      </Layout>

    </>
  );
}
export default AppLayout; 