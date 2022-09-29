import { Table, Button, Modal, Tree } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled, } from '@ant-design/icons'

const { confirm } = Modal
export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    const [rightList, setRightList] = useState([])
    const [currentRight, setcurrentRight] = useState([])
    const [currentId, setcurrentId] = useState(0)
    const [isModalVisible, setisModalVisible] = useState(false)
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        render: (id) => {
            return <b>{id}</b>
        }
    },
    {
        title: '角色名称',
        dataIndex: 'roleName',
    },
    {
        title: '操作',
        render: (item) => {
            return <div>
                <Button danger shape='circle' icon={<DeleteOutlined />}
                    onClick={() => confirmMethod(item)}
                ></Button>
                <Button type='primary'
                    shape='circle'
                    icon={<EditOutlined />}
                    onClick={() => {
                        // console.log(isModalVisible);
                        setisModalVisible(true)
                        setcurrentRight(item.rights)
                        setcurrentId(item.id)
                    }}
                />
            </div >
        }
    },
    ]
    useEffect(() => {
        axios.get('/roles').then(res => {
            // console.log(res.data);
            setdataSource(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/rights?_embed=children').then(res => {
            // console.log(res.data);
            setRightList(res.data)
        })
    }, [])

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
        // console.log(item);
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/roles/${item.id}`)

    }
    const handleOk = () => {
        setisModalVisible(false)
        console.log(currentRight);
        setdataSource(dataSource.map(item => {
            if (item.id === currentId) {
                return {
                    ...item,
                    rights: currentRight
                }
            }
            return item
        }))
        //patch
        axios.patch(`/roles/${currentId}`, {
            rights: currentRight
        })
    }
    const handleCancel = () => {
        setisModalVisible(false)
    }
    const onCheck = (ckeckKeys) => {
        // console.log(ckeckKeys);
        setcurrentRight(ckeckKeys.checked)
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                rowKey={(item) => item.id}></Table>

            <Modal title="权限管理" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    treeData={rightList}
                    checkedKeys={currentRight}
                    onCheck={onCheck}
                    checkStrictly={true}
                    fieldNames={{
                        title: 'label'
                    }}
                />
            </Modal>
        </div>
    )
}
