import React from 'react'
import NewsPublish from '../../../../components/PublishManage/NewsPublish'
import usePublish from '../../../../components/PublishManage/usePublish'
import { Button } from 'antd'

export default function Sunset() {
    //1===unpublished 2===published 3===sunset
    //customise Hooks
    const { dataSource, handleDelete } = usePublish(3)

    return (
        <div>
            <NewsPublish dataSource={dataSource}
                button={(id) => <Button danger onClick={() => handleDelete(id)}>Delete</Button>}
            ></NewsPublish>
        </div>
    )
}
