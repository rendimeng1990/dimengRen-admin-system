import React from 'react'
import NewsPublish from '../../../../components/PublishManage/NewsPublish'
import usePublish from '../../../../components/PublishManage/usePublish'
import { Button } from 'antd'
export default function Published() {
    //1===unpublished 2===published 3===sunset
    //customise Hooks
    const { dataSource, handleOffline } = usePublish(2)

    return (
        <div>
            <NewsPublish dataSource={dataSource}
                button={(id) => <Button danger onClick={() => handleOffline(id)}>Offline</Button>}
            ></NewsPublish>
        </div>
    )
}
