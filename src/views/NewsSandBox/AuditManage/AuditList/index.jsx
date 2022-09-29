import { Table, Button, Tag, notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function AuditList() {
    const [dataSource, setdataSource] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate()
    useEffect(() => {
        const roleObj = {
            '1': 'superadmin',
            '2': 'admin',
            '3': 'editor'
        }
        axios.get(`/news?auther=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
            const list = res.data
            setdataSource(roleObj[roleId] === 'superadmin' ? list : [
                ...list.filter(item => item.author === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }, [username])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (title, item) => {
                return <NavLink to={`/NewsSandBox/NewsManage/NewsPreview/${item.id}`}>{title}</NavLink>
            }
        },
        {
            title: 'Author',
            dataIndex: 'author',

        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: 'Audit State',
            dataIndex: 'auditState',
            render: (auditState) => {
                const colorList = ['', 'orange', 'green', 'red']
                const auditList = ['', 'Under Audit', 'Approved', 'Not Approved']
                return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    {
                        item.auditState === 1 && <Button danger onClick={() => { handleRevert(item) }}>Unpublish</Button>
                    }
                    {
                        item.auditState === 2 && <Button onClick={() => {
                            handlePublish(item)
                        }}>Publish</Button>
                    }
                    {
                        item.auditState === 3 && <Button type='primary' onClick={() => {
                            handleUpdate(item)
                        }}>Modify</Button>
                    }


                </div >
            }
        },
    ];
    const handleRevert = (item) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.patch(`/news/${item.id}`, {
            auditState: 0
        }).then(res => {
            notification.info({
                message: `Notification `,
                description:
                    `You can check your news in DraftBox`,
                placement: 'topRight',
            });
        })
    }
    const handleUpdate = (item) => {
        navigate(`/NewsSandBox/NewsManage/Update/${item.id}`)
    }
    const handlePublish = (item) => {
        axios.patch(`/news/${item.id}`, {

            "publishState": 2,
            "publishTime": Date.now()
        }).then(res => {
            navigate('/NewsSandBox/PublishManage/Published')
            notification.info({
                message: `Notification `,
                description:
                    `You can check your news in Published Box`,
                placement: 'topRight',
            });
        })
    }
    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id} />
        </div>
    )
}
