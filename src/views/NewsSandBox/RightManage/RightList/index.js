import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal
export default function RightList() {
    useEffect(() => {
        axios.get('/rights?_embed=children').then(res => {
            const list = res.data
            list.forEach(item => {
                if (item.children.length === 0) {
                    item.children = ''
                }
            })
            setDataSource(list)
        })
    }, [])


    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'label',

        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color='orange'>{key}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button danger shape='circle' icon={<DeleteOutlined />}
                        onClick={() => confirmMethod(item)}
                    ></Button>
                    <Popover
                        content={<div style={{ textAlign: "center" }}>
                            <Switch checked={item.pagepermisson}
                                onChange={() => switchMethod(item)}></Switch>
                        </div>}
                        title="Setting"
                        trigger={item.pagepermisson === undefined ? '' : 'click'}
                    >
                        <Button type='primary'
                            shape='circle'
                            icon={<EditOutlined />}
                            disabled={item.pagepermisson === undefined}
                        />
                    </Popover>

                </div >
            }
        },
    ];
    const switchMethod = (item) => {

        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        // console.log(item);
        setDataSource([...dataSource])
        if (item.grade === 1) {
            axios.patch(`/rights/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        }
        else {
            axios.patch(`/rights/children/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        }
    }
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
        console.log(item);
        if (item.grade === 1) {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            axios.delete(`/rights/${item.id}`)
        }
        else {
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            setDataSource([...dataSource])
            axios.delete(`/rights/children/${item.id}`)
        }

    }
    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5
                }} />
        </div>
    )
}
