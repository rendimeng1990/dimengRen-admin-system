import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import NewsSandbox from '../views/NewsSandBox'
import Home from '../views/NewsSandBox/Home'
import UserManage from '../views/NewsSandBox/UserManage'
import UserList from '../views/NewsSandBox/UserManage/UserList'
import RightManage from '../views/NewsSandBox/RightManage'
import RoleList from '../views/NewsSandBox/RightManage/RoleList'
import RightList from '../views/NewsSandBox/RightManage/RightList'
import NotFound from '../views/NewsSandBox/NotFound'
import Login from '../views/Login'
import NewsAdd from '../views/NewsSandBox/NewsManage/NewsAdd'
import NewsDraft from '../views/NewsSandBox/NewsManage/NewsDraft'
import NewsCategory from '../views/NewsSandBox/NewsManage/NewsCategory'
import NewsManage from '../views/NewsSandBox/NewsManage'
import AuditManage from '../views/NewsSandBox/AuditManage'
import Audit from '../views/NewsSandBox/AuditManage/Audit'
import AuditList from '../views/NewsSandBox/AuditManage/AuditList'
import PublishManage from '../views/NewsSandBox/PublishManage'
import Unpublished from '../views/NewsSandBox/PublishManage/Unpublished'
import Published from '../views/NewsSandBox/PublishManage/Published'
import Sunset from '../views/NewsSandBox/PublishManage/Sunset'
import NewsPreview from '../views/NewsSandBox/NewsManage/NewsPreview'
import Update from '../views/NewsSandBox/NewsManage/Update'
import News from '../views/News';
import TeamPage from '../views/TeamPage';
import Register from '../views/Register';
import axios from 'axios';




export default function MRouter() {
    const location = useLocation()
    const [state, setState] = useState([])

    useEffect(() => {
        axios.get('/roles').then(res => {
            // console.log(res.data[0].rights);
            setState(res.data[0].rights)
        })
    }, [])

    function AuthComponent({ children }) {
        const isLogin = localStorage.getItem('token')
        return isLogin ? children : <Navigate to='/Login' />
    }

    const rightList = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).role.rights : state
    let myPathname = location.pathname.replace(/\d+./g, '')
    // console.log(myPathname.substring(-1, myPathname.length - 1));
    // console.log(rightList);
    function CheckRights({ children }) {
        return rightList.includes(location.pathname) || rightList.includes(myPathname.substring(-1, myPathname.length - 1)) ? children : <Navigate to='/Login' />
    }

    const element = useRoutes([
        {
            path: '/NewsSandBox',
            element: <NewsSandbox />,
            children: [
                {
                    path: '',
                    element: <Navigate to='/NewsSandBox/Home' />
                },
                {
                    path: 'home',
                    element:
                        <Home />

                },
                {
                    path: 'UserManage',
                    element:
                        <CheckRights>
                            <UserManage />
                        </CheckRights>
                    ,
                    children: [
                        {
                            path: '',
                            element: <Navigate to='/NewsSandBox/UserManage/UserList' />
                        },
                        {
                            path: 'UserList',
                            element: <UserList />,
                        },
                    ]
                },
                {
                    path: 'RightManage',
                    element:
                        <CheckRights>
                            <RightManage />
                        </CheckRights>
                    ,
                    children: [
                        {
                            path: '',
                            element: <Navigate to='/NewsSandBox/RightManage/RoleList' />
                        },
                        {
                            path: 'RoleList',
                            element: <RoleList />
                        },
                        {
                            path: 'RightList',
                            element: <RightList />
                        },
                    ]
                },
                {
                    path: 'NewsManage',
                    element:
                        <CheckRights>
                            <NewsManage />
                        </CheckRights>
                    ,
                    children: [
                        {
                            path: '',
                            element: <Navigate to='/NewsSandBox/NewsManage/NewsAdd' />
                        },
                        {
                            path: 'NewsAdd',
                            element: <NewsAdd />
                        },
                        {
                            path: 'NewsDraft',
                            element: <NewsDraft />
                        },
                        {
                            path: 'NewsCategory',
                            element: <NewsCategory />
                        },
                        {
                            path: 'NewsPreview/:id',
                            element: <NewsPreview />
                        },
                        {
                            path: 'Update/:id',
                            element: <Update />
                        },
                    ]
                },
                {
                    path: 'AuditManage',
                    element:
                        <CheckRights>
                            <AuditManage />
                        </CheckRights>
                    ,
                    children: [
                        {
                            path: '',
                            element: <Navigate to='/NewsSandBox/AuditManage/Audit' />
                        },
                        {
                            path: 'Audit',
                            element: <Audit />
                        },
                        {
                            path: 'AuditList',
                            element: <AuditList />
                        },
                    ]
                },
                {
                    path: 'PublishManage',
                    element:
                        <CheckRights>
                            <PublishManage />
                        </CheckRights>
                    ,
                    children: [
                        {
                            path: '',
                            element: <Navigate to='/NewsSandBox/NewsManage/Published' />
                        },
                        {
                            path: 'Published',
                            element: <Published />
                        },
                        {
                            path: 'Unpublished',
                            element: <Unpublished />
                        },
                        {
                            path: 'Sunset',
                            element: <Sunset />
                        },

                    ]
                },

            ]
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/News',
            element: <News />
        },
        {
            path: '/',
            element:
                <Navigate to='/News' />
        },
        {
            path: '*',
            element: <NotFound />
        },
        {
            path: '/TeamPage',
            element: <TeamPage />
        },
        {
            path: '/Register',
            element: <Register />
        },


    ])
    return (
        element
    )
}
