import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { updata } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
        this.selectAvatar = this.selectAvatar.bind(this);
    }
    onChange(key,value){
        this.setState({
            [key]: value
        })
    }
    selectAvatar(value){
        this.setState({
            avatar: value
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to= {this.props.redirectTo}/> : null}
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                ></AvatarSelector>
                <InputItem
                    onChange={(value) => this.onChange('title',value)}
                >
                    招聘职位
                </InputItem>
                <InputItem
                    onChange={(value) => this.onChange('company',value)}
                >
                    公司名称
                </InputItem>
                <InputItem
                    onChange={(value) => this.onChange('money',value)}
                >
                    职位薪资
                </InputItem>
                <TextareaItem
                    onChange={(value) => this.onChange('desc',value)}
                    rows={1}
                    autoHeight
                    title='职位要求'
                >
                </TextareaItem>
                <Button type="primary" onClick={()=>{
                    this.props.updata(this.state)
                }}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => state.user,
    { updata }
)(BossInfo);