import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import React from 'react';
import { useNavigate } from 'react-router-dom';



export default function App() {
    const navigate = useNavigate()
    const onClick = ({ key }) => {
        if (key === '1') {
            console.log(1);
        }
        if (key === '2') {
            localStorage.removeItem('token')
            navigate('/Login')
        }
    };

    const { role: { roleName } } = JSON.parse(localStorage.getItem('token'))

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    key: '1',
                    label: (
                        <b >
                            {roleName}
                        </b>
                    ),
                },
                {
                    key: '2',
                    danger: true,
                    label: 'Sign out',
                },
            ]}
        />
    );
    return (

        <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Space>
            </a>
        </Dropdown>

    )
}
