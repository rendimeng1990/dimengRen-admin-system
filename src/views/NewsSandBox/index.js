import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import './index.css'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { Spin } from 'antd';
import { Layout } from 'antd';
import { connect } from 'react-redux'

const { Content } = Layout;
function NewsSandbox(props) {
    nprogress.start()
    useEffect(() => {
        nprogress.done()


    })

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideMenu ></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Spin size="large" spinning={props.isLoading}>
                    <Content className="site-layout-background">

                        <Outlet></Outlet> {/* spots for children components */}
                    </Content>
                </Spin>

            </Layout>
        </Layout>
    )
}
const mapStateToProps = ({ LoadingReducer: { isLoading } }) => {
    // console.log(state);
    return {
        isLoading
    }
}


export default connect(mapStateToProps)(NewsSandbox)