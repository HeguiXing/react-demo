import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../redux/user.redux';
import {getRedirectPath} from '../../util';

class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const publicList2 = ['/me','/msg']
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) === -1) {
            //获取用户信息
            axios.get('/user/info')
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            //有登录信息
                            const p = getRedirectPath(res.data.data)
                            this.props.loadData(res.data.data);
                            if(publicList2.indexOf(pathname) === -1){
                                this.props.history.push(p)
                            }
                            
                        } else {
                            this.props.history.push('/login')
                        }
                    }
                })
        }

    }
    render() {
        return null;
    }
}

export default withRouter(connect(
    null,
    {loadData}
)(AuthRoute));