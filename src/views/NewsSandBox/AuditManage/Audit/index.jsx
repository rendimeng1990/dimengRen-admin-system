import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, notification } from 'antd'
import { NavLink } from 'react-router-dom'
export default function Audit() {
    const [dataSource, setDataSource] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        const roleObj = {
            '1': 'superadmin',
            '2': 'admin',
            '3': 'editor'
        }
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const list = res.data
            setDataSource(roleObj[roleId] === 'superadmin' ? list : [
                ...list.filter(item => item.author === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }, [roleId, region, username])

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
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type='primary' onClick={() => {
                        handleAudit(item, 2, 1)
                    }}>Approved</Button>
                    <Button danger onClick={() => {
                        handleAudit(item, 3, 0)
                    }}>Reject</Button>

                </div >
            }
        },
    ];
    const handleAudit = (item, auditState, publishState) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.patch(`/news/${item.id}`, {
            auditState,
            publishState
        }).then(res => {
            notification.info({
                message: `Notification `,
                description:
                    `You can check your news state in AuditList Box`,
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
