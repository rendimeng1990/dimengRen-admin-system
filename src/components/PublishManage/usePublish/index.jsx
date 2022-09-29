import axios from 'axios'
import { useEffect, useState } from 'react'
import { notification } from 'antd'
export default function usePublish(type) {

    const { username } = JSON.parse(localStorage.getItem("token"))
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
            // console.log(res.data);
            setDataSource(res.data)
        })
    }, [username, type])

    const handlePublish = (id) => {
        // console.log(id);
        setDataSource(dataSource.filter(item => item.id !== id))
        axios.patch(`/news/${id}`, {

            "publishState": 2,
            "publishTime": Date.now()
        }).then(res => {
            notification.info({
                message: `Notification `,
                description:
                    `You can check your news in Published Box`,
                placement: 'topRight',
            });
        })
    }
    const handleOffline = (id) => {
        // console.log(id);
        setDataSource(dataSource.filter(item => item.id !== id))
        axios.patch(`/news/${id}`, {

            "publishState": 3,
        }).then(res => {
            notification.info({
                message: `Notification `,
                description:
                    `Your news is offline,you can check it in Sunset box`,
                placement: 'topRight',
            });
        })
    }
    const handleDelete = (id) => {
        setDataSource(dataSource.filter(item => item.id !== id))
        axios.delete(`/news/${id}`).then(res => {
            notification.info({
                message: `Notification `,
                description:
                    `You have already been deleted this news`,
                placement: 'topRight',
            });
        })
    }
    return {
        dataSource, handlePublish, handleOffline, handleDelete
    }
}