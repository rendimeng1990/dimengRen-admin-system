import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, notification } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled, UploadOutlined } from '@ant-design/icons'
import { useNavigate, NavLink } from 'react-router-dom'

const { confirm } = Modal
export default function NewsDraft() {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
            const list = res.data.map(item => ({ ...item, key: item.id }))
            setDataSource(list)
        })
    }, [username])



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: 'News Title',
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
                return category.title
            }
        },

        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button danger shape='circle' icon={<DeleteOutlined />}
                        onClick={() => confirmMethod(item)}
                    ></Button>
                    <Button shape='circle' icon={<EditOutlined />} onClick={() => {
                        navigate(`/NewsSandBox/NewsManage/Update/${item.id}`)
                    }} />
                    <Button type='primary'
                        shape='circle'
                        icon={<UploadOutlined />}
                        onClick={() => { handleCheck(item.id) }}
                    />
                </div >
            }
        },
    ];

    const confirmMethod = (item) => {
        confirm({
            title: "Do you want to delete these items?",
            icon: <ExclamationCircleFilled />,
            onOk() {
                // console.log('Ok');
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            }
        })

    }
    const deleteMethod = (item) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/news/${item.id}`)
    }

    const handleCheck = (id) => {
        axios.patch(`/news/${id}`, {
            auditState: 1
        }).then(res => {
            navigate('/NewsSandBox/AuditManage/AuditList')
            notification.info({
                message: `Notification `,
                description:
                    `You can check your news in AuditList`,
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
                rowKey={item => item.id}
            />
        </div>
    )
}
