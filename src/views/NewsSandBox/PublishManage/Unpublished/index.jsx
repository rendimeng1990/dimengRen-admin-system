
import React from 'react'
import NewsPublish from '../../../../components/PublishManage/NewsPublish'
import usePublish from '../../../../components/PublishManage/usePublish'
import { Button } from 'antd'
export default function Unpublished() {
    //1===unpublished 2===published 3===sunset
    //customise Hooks
    const { dataSource, handlePublish } = usePublish(1)

    return (
        <div>
            <NewsPublish dataSource={dataSource}
                button={(id) => <Button type='primary'
                    onClick={() => handlePublish(id)}>
                    Publish
                </Button>}
            ></NewsPublish>
        </div>
    )
}
