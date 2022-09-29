import React, { useState, useEffect, useRef } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select, message, notification } from 'antd'
import NewsEditor from '../../../../components/NewsManage/NewsEditor'
import './index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const { Step } = Steps
const { Option } = Select
export default function App() {
    const [current, setCurrent] = useState(0)
    const [categoryList, setCategoryList] = useState([])
    const [formInfo, setFormInfo] = useState({})
    const [content, setContent] = useState('')
    const User = JSON.parse(localStorage.getItem('token'))
    const NewsForm = useRef(null)
    const navigate = useNavigate()

    const handleNext = () => {
        if (current === 0) {
            NewsForm.current.validateFields().then(res => {
                console.log(res);
                setFormInfo(res)
                setCurrent(current + 1)
            }).catch(err => {
                console.log(err);
            })

        } else {
            if (content === '' || content.trim() === '<p></p>') {
                message.error('News content cannot be empty')
            } else {
                setCurrent(current + 1)
            }

        }
    }
    const handlePrev = () => {
        setCurrent(current - 1)
    }

    const handleSave = (auditState) => {
        axios.post('/news', {
            ...formInfo,
            "content": content,
            "region": User.region ? User.region : 'Global',
            "author": User.username,
            "roleId": User.roleId,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publishTime": 0
        }).then(res => {
            navigate(auditState === 0 ? '/NewsSandBox/NewsManage/NewsDraft' : '/NewsSandBox/AuditManage/AuditList')
            notification.info({
                message: `Notification `,
                description:
                    `You can check your news in ${auditState === 0 ? 'draft' : 'AuditList'}`,
                placement: 'topRight',
            });
        })
    }


    useEffect(() => {
        axios.get("/categories").then(res => {
            // console.log(res.data);
            setCategoryList(res.data)
        })
    }, [])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="write news"
                subTitle="This is a subtitle"
            />
            <Steps current={current}>
                <Step title="Basic Infomation" description="Headlines,Categories" />
                <Step title="Content" description="News main content" />
                <Step title="Submit" description="Save a draft or submit for review" />
            </Steps>

            <div style={{ margin: '50px' }}>
                <div className={current === 0 ? '' : 'active'}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}

                        autoComplete="off"
                        ref={NewsForm}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Category of News!',
                                },
                            ]}
                        >
                            <Select>
                                {
                                    categoryList.map(item => <Option value={item.id} key={item.id}>{item.title}</Option>)
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >

                        </Form.Item>
                    </Form>
                </div>
                <div className={current === 1 ? '' : 'active'}>
                    <NewsEditor getContent={(value) => {
                        // console.log(value);
                        setContent(value)
                    }}></NewsEditor>
                </div>
                <div className={current === 2 ? '' : 'active'}></div>
            </div>


            <div style={{ marginTop: '50px' }}>
                {
                    current === 2 && <span>
                        <Button type='primary' onClick={() => { handleSave(0) }}>Save as Draft</Button>
                        <Button danger='true' onClick={() => { handleSave(1) }}>Submit</Button>
                    </span>
                }
                {
                    current < 2 && <Button type='primary' onClick={handleNext}>Next</Button>
                }
                {
                    current > 0 && <Button onClick={handlePrev}>Previous</Button>

                }
            </div>
        </div>
    )
}
