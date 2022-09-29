import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Modal, Switch } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import UserForm from '../../../../components/UserManage/UserForm'

const { confirm } = Modal
export default function UserList() {

    const [isAddVisible, setisAddVisible] = useState(false)
    const [isUpdateVisible, setisUpdateVisible] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [roleList, setroleList] = useState([])
    const [regionList, setregionList] = useState([])
    const [current, setcurrent] = useState(null)
    const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
    const addForm = useRef(null)
    const updateForm = useRef(null)

    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
        '1': 'superadmin',
        '2': 'admin',
        '3': 'editor'
    }
    useEffect(() => {
        axios.get('/users?_expand=role').then(res => {
            const list = res.data
            setDataSource(roleObj[roleId] === 'superadmin' ? list : [
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }, [])
    useEffect(() => {
        axios.get('/regions').then(res => {
            const list = res.data
            setregionList(list)
        })
    }, [])
    useEffect(() => {
        axios.get('/roles').then(res => {
            const list = res.data
            setroleList(list)
        })
    }, [])

    const columns = [
        {
            title: 'Region',
            dataIndex: 'region',
            filters: [
                ...regionList.map(item => ({
                    text: item.title,
                    value: item.value
                })),
                {
                    text: 'Global',
                    value: 'Global'
                }
            ],
            onFilter: (value, item) => {
                if (value === 'Global') {
                    return item.region === ''
                }
                return item.region === value
            },
            render: (region) => {
                return <b>{region === '' ? 'Global' : region}</b>
            }
        },
        {
            title: 'Name',
            dataIndex: 'role',
            render: (role) => {
                return role?.roleName
            }
        },
        {
            title: 'UserName',
            dataIndex: 'username',
        },
        {
            title: 'State',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState}
                    disabled={item.default}
                    onChange={() => handleChange(item)}
                ></Switch>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button danger shape='circle' icon={<DeleteOutlined />}
                        onClick={() => confirmMethod(item)}
                        disabled={item.default}
                    ></Button>
                    <Button type='primary'
                        shape='circle'
                        icon={<EditOutlined />}
                        disabled={item.default}
                        onClick={() => handleUpdate(item)}
                    />

                </div >
            }
        },
    ];

    const handleChange = (item) => {
        item.roleState = !item.roleState
        setDataSource([...dataSource])
        axios.patch(`/users/${item.id}`, {
            roleState: item.roleState
        })
    }

    const handleUpdate = async (item) => {
        await setisUpdateVisible(true)
        if (item.roleId === 1) {
            setisUpdateDisabled(true)
        } else {
            setisUpdateDisabled(false)
        }
        updateForm.current.setFieldsValue(item)
        setcurrent(item)
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
        // console.log(item);
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/users/${item.id}`)

    }
    const addFormOk = () => {
        addForm.current.validateFields().then(value => {
            // console.log(value);
            setisAddVisible(false)
            addForm.current.resetFields()
            //post data to backend and generate id,then set datasource
            axios.post(`/users`, {
                ...value,
                "roleState": true,
                "default": false,
            }).then(res => {
                console.log(res.data);
                setDataSource([...dataSource, {
                    ...res.data,
                    role: roleList.filter(item => item.id === value.roleId)[0]
                }])
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const updateFormOk = () => {
        updateForm.current.validateFields().then(value => {
            setisUpdateVisible(false)

            setDataSource(dataSource.map(item => {
                if (item.id === current.id) {
                    return {
                        ...item,
                        ...value,
                        role: roleList.filter(item => item.id === value.roleId)[0]
                    }
                }
                return item
            }))
            setisUpdateDisabled(!isUpdateDisabled)

            axios.patch(`/users/${current.id}`, value)
        })
    }

    return (
        <div>
            <Button type='primary' onClick={() => {
                setisAddVisible(true)
            }}>AddUser</Button>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id} />

            <Modal
                visible={isAddVisible}
                title="Create a new user"
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => {
                    setisAddVisible(false)
                }}
                onOk={() => addFormOk()}
            >
                <UserForm regionList={regionList} roleList={roleList}
                    ref={addForm}
                ></UserForm>
            </Modal>
            <Modal
                visible={isUpdateVisible}
                title="Update user information"
                okText="Update"
                cancelText="Cancel"
                onCancel={() => {
                    setisUpdateVisible(false)
                    setisUpdateDisabled(!isUpdateDisabled)
                }}
                onOk={() => updateFormOk()}
            >
                <UserForm regionList={regionList} roleList={roleList}
                    ref={updateForm} isUpdateDisabled={isUpdateDisabled}
                    isUpdate={true}
                ></UserForm>
            </Modal>
        </div>
    )
}
