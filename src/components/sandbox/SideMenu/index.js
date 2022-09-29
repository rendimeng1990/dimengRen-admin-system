import {
    UserOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react'
import { Layout, Menu, SubMenu } from 'antd';
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';

const { Sider } = Layout;


const iconList = {
    '/NewsSandBox/Home': <UserOutlined />,
    '/NewsSandBox/UserManage/UserList': <UserOutlined />,
    '/NewsSandBox/RightManage/RightList': <UserOutlined />,
    '/NewsSandBox/RightManage/RoleList': <UserOutlined />,
    '/NewsSandBox/RightManage': <UserOutlined />,
    '/NewsSandBox/UserManage': <UserOutlined />,
    '/NewsSandBox/NewsManage/NewsAdd': <UserOutlined />,
    '/NewsSandBox/NewsManage/NewsDraft': <UserOutlined />,
    '/NewsSandBox/NewsManage/NewsCategory': <UserOutlined />,
    '/NewsSandBox/NewsManage': <UserOutlined />,
    '/NewsSandBox/AuditManage': <UserOutlined />,
    '/NewsSandBox/AuditManage/Audit': <UserOutlined />,
    '/NewsSandBox/AuditManage/AuditList': <UserOutlined />,
    '/NewsSandBox/PublishManage': <UserOutlined />,
    '/NewsSandBox/PublishManage/Unpublished': <UserOutlined />,
    '/NewsSandBox/PublishManage/Published': <UserOutlined />,
    '/NewsSandBox/PublishManage/Sunset': <UserOutlined />,
}
function SideMenu(props) {

    const [mymenu, setMymenu] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const selectKeys = [location.pathname]
    const openKeys = ['/' + location.pathname.split("/")[1] + '/' + location.pathname.split("/")[2]]
    useEffect(() => {
        axios.get('/rights?_embed=children').then(res => {
            // console.log(res.data);
            setMymenu(res.data)
        })
    }, [])

    const { role: { rights } } = JSON.parse(localStorage.getItem('token'))

    const checkPagePermisson = (item) => {
        return item.pagepermisson && rights.includes(item.key)
    }
    const renderMenu = (mymenu) => {
        return mymenu.map(item => {
            if (item.children?.length > 0 && checkPagePermisson(item)) {
                return <Menu.SubMenu key={item.key} icon={iconList[item.key]} title={item.label}>
                    {renderMenu(item.children)}
                </Menu.SubMenu>
            }
            return checkPagePermisson(item) && <Menu.Item key={item.key} icon={iconList[item.key]}>{item.label}</Menu.Item>
        })
    }
    // console.log(openKeys);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={props.isCollapsed} >
            <div style={{ display: 'flex', height: '100%', flexDirection: "column" }}>
                <div className="logo" >Administration System</div>
                <div style={{ flex: 1, overflow: "auto" }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}
                        // items={mymenu}
                        onClick={e => navigate(e.key)} >
                        {renderMenu(mymenu)}
                    </Menu>
                </div>
            </div>

        </Sider >
    )
}

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
    // console.log(state);
    return {
        isCollapsed
    }
}


export default connect(mapStateToProps)(SideMenu)