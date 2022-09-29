import React from 'react'
import { Form, Input, Select } from 'antd'
import { forwardRef, useState, useEffect } from 'react'

const { Option } = Select

const UserForm = forwardRef((props, ref) => {
    const { regionList, roleList } = props
    const [isDisabled, setisDisabled] = useState(false)
    const { roleId, region } = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
        '1': 'superadmin',
        '2': 'admin',
        '3': 'editor'
    }
    useEffect(() => {
        setisDisabled(props.isUpdateDisabled)
    }, [props.isUpdateDisabled])
    // console.log(props);
    const checkRegionDisabled = (item) => {
        if (props.isUpdate) {
            if (roleObj[roleId] === 'superadmin') {
                return false
            } else {
                return true
            }
        } else {
            if (roleObj[roleId] === 'superadmin') {
                return false
            } else {
                return item.value !== region
            }
        }
    }
    const checkRoleDisabled = (item) => {
        if (props.isUpdate) {
            if (roleObj[roleId] === 'superadmin') {
                return false
            } else {
                return true
            }
        } else {
            if (roleObj[roleId] === 'superadmin') {
                return false
            } else {
                return roleObj[item.id] !== 'editor'
            }
        }
    }

    return (
        <div>
            <Form
                ref={ref}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="region"
                    label="Region"
                    rules={isDisabled ? [] : [{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Select disabled={isDisabled}>
                        {
                            props.regionList.map(item =>
                                <Option value={item.value}
                                    key={item.id}
                                    disabled={checkRegionDisabled(item)}
                                >{item.title}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="role"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Select onChange={(value) => {
                        if (value === 1) {
                            setisDisabled(true)
                            ref.current.setFieldsValue({
                                region: ''
                            })
                        }
                        else {
                            setisDisabled(false)
                        }
                    }}>
                        {
                            roleList.map(item =>
                                <Option value={item.id}
                                    key={item.id}
                                    disabled={checkRoleDisabled(item)}
                                >{item.roleName}</Option>)
                        }

                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
})

export default UserForm