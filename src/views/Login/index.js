import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './index.css'
import Particles from 'particles-bg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const onFinish = (value) => {
        // console.log(value);
        axios.get(`/users?username=${value.username}&password=${value.password}&roleState=true&_expand=role`).then(res => {
            // console.log(res.data);
            if (res.data.length === 0) {
                message.error('username or password is not correct')
            } else {
                localStorage.setItem('token', JSON.stringify(res.data[0]))
                navigate('/NewsSandBox/Home')
            }
        })
    }


    return (
        <div style={{ background: 'rgb(35,39,65)', height: '100%' }}>
            <Particles g={1} color="random" num={1} />
            <div className='formContainer' style={{ height: '300px' }}>
                <div className='title'> <a href='/News'>Global Administration System</a> </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        // style={{ marginTop: '130px' }}
                        >
                            Log in
                        </Button>
                        <span style={{ color: 'white', marginLeft: '100px' }}>Don't have an account? <a href='/Register'>Register</a> now!</span>

                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
