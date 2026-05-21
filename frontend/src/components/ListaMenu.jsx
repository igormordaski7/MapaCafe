import { Menu } from "antd";
import { 
  HomeOutlined,
  CoffeeOutlined,
  PlusCircleOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";  

const ListaMenu = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/MinhasCafeterias",
      icon: <CoffeeOutlined />,
      label: <Link to="/MinhasCafeterias">Minhas Cafeterias</Link>,
    },
    {
      key: "/NovaCafeteria",
      icon: <PlusCircleOutlined />,
      label: <Link to="/NovaCafeteria">Nova Cafeteria</Link>,
    },
    {
      key: "/Dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/Dashboard">Dashboard</Link>,
    },
    {
      key: "/MeuPerfil",
      icon: <UserOutlined />,
      label: <Link to="/MeuPerfil">Meu Perfil</Link>,
    },
  ];

  return (  
    <Menu 
      mode="inline"
      className="menu-bar"
      selectedKeys={[selectedKey]}
      items={items}
    />
  );
};

export default ListaMenu; 
