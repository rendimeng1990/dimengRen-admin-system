import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Descriptions, PageHeader } from 'antd';
import axios from 'axios';
import moment from 'moment'
export default function NewsPreview() {
    const params = useParams()
    const [newsInfo, setNewsInfo] = useState(null)
    useEffect(() => {
        // console.log(params.id);
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => {
            // console.log(res.data);
            setNewsInfo(res.data)
        })
    }, [params.id])
    const auditList = ['Unaudited', 'Under Audit', 'Approved', 'Not Approved']
    const piblishList = ['Unpublished', 'To Be Published', 'Online', 'Offline']
    const colorList = ['black', 'orange', 'green', 'red']
    return (
        <div>
            {
                newsInfo && <div>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={newsInfo.category.title}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="Created">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="Created Time">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                            <Descriptions.Item label="Published Time">{newsInfo.publishTime ? moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss") : '-'}</Descriptions.Item>
                            <Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="Audit State">
                                <span style={{ color: colorList[newsInfo.auditState] }}>{auditList[newsInfo.auditState]}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label="Publish State">
                                <span style={{ color: colorList[newsInfo.publishState] }}>{piblishList[newsInfo.publishState]}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label="Views">{newsInfo.view}</Descriptions.Item>
                            <Descriptions.Item label="Likes">{newsInfo.star}</Descriptions.Item>
                            <Descriptions.Item label="Comments">0</Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <div dangerouslySetInnerHTML={{
                        __html: newsInfo.content
                    }} style={{ border: '1px solid grey', margin: '0 24px' }}></div>
                </div>
            }
        </div>
    )
}
