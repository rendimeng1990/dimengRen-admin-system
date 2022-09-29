import React, { useRef, useState } from 'react'
import { Form, Button, Input, Select } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './index.module.css'
import Particles from 'particles-bg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
export default function Login() {
    const [isDisabled, setisDisabled] = useState(false)
    const [UserList, setUserList] = useState({})
    const navigate = useNavigate()
    const myText = useRef()

    const handleAdd = () => {
        console.log(myText.current.validateFields().then(value => {
            console.log(value);
            setUserList(value)
            axios.post(`/users`, {
                ...value,
                "roleState": true,
                "default": false,
            }).then(res => {
                console.log(res.data);
            })
        }).catch(err => {
            console.log(err);
        })
        )
    }

    return (

        <div style={{ background: 'rgb(235,235,235)', height: '100%' }}>
            <Particles g={1} color="random" num={1} />
            <div className='formContainer' >
                <div className='title'> <a href="/News">Global Administration System</a> </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    ref={myText}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="Region"
                        rules={isDisabled ? [] : [{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Select disabled={isDisabled} placeholder="Select a Region">
                            <Option value="1">Asia</Option>
                            <Option value="2">Europe</Option>
                            <Option value="3">North America</Option>
                            <Option value="4">South America</Option>
                            <Option value="5">Oceanian</Option>
                            <Option value="6">Afirca</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="roleId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Select placeholder="Select a Role"
                            onChange={(value) => {
                                console.log(value);
                                value === '1' ? setisDisabled(true) : setisDisabled(false)
                                console.log(isDisabled);
                            }}>
                            <Option value="1">SuperAdmin</Option>
                            <Option value="2">RegionalAdmin</Option>
                            <Option value="3">RegionalEditor</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={handleAdd}
                        >
                            Register
                        </Button>
                        <span
                            style={{ marginLeft: '100px' }}
                        >
                            Already have an account? <a href="/Login" >Sign In</a>
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
