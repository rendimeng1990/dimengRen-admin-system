import React from 'react'
import { Layout } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import MyDropDown from './DropDown';
import { connect } from 'react-redux';
const { Header } = Layout;
function TopHeader(props) {
    // console.log(props);
    // const [collapsed, setCollapsed] = useState(false);
    const { username } = JSON.parse(localStorage.getItem('token'))

    const changeCollapsed = () => {
        // console.log(props);
        props.changeCollapsed()
    }
    return (
        <Header
            className="site-layout-background" style={{ padding: '0,16px' }} >
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })} */}
            {
                props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }
            <div style={{ float: 'right' }}>
                <span>
                    Welcome back! <span style={{ color: "#1890ff" }}>{username}</span> <MyDropDown />
                </span>

            </div>
        </Header>
    )
}

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
    // console.log(state);
    return {
        isCollapsed
    }
}
const mapDispatchToProps = {
    changeCollapsed() {
        return {
            type: 'change_collapsed',
            // payload:
        }//to action
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)

/*
connect(
    mapStateToProps
    mapDispatchToProps
) (components)
*/