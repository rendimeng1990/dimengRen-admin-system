import React from 'react'
import { Table, Button } from 'antd'

import { NavLink } from 'react-router-dom';


export default function NewsPublish(props) {
    // console.log(props);
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (title, item) => {
                return <NavLink to={`/NewsSandBox/NewsManage/NewsPreview/${item.id}`}>{item.title}</NavLink>
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
                return <div>{category.title}</div>
            }
        },
        {
            title: 'Edit',
            render: (item) => {
                return <div>
                    {props.button(item.id)}
                </div >
            }
        },
    ];

    return (
        <div>
            <Table
                dataSource={props.dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id} />
        </div>
    )
}
