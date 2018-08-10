import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { register } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            password: '',
            repeatpassword: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleCheange(key,value){
        this.setState({
            [key]: value
        })
    }
    handleRegister(){
        this.props.register(this.state);
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.user.redirectTo ? <Redirect to= {this.props.user.redirectTo}/>: null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <WhiteSpace/> 
                        <InputItem
                            onChange={value => this.handleCheange('user',value)}
                        >
                            用户名
                        </InputItem>
                        <WhiteSpace/> 
                        <InputItem
                            type="password"
                            onChange={value => this.handleCheange('password',value)}
                        >
                            密码
                        </InputItem>
                        <WhiteSpace/> 
                        <InputItem
                            type="password"
                            onChange={value => this.handleCheange('repeatpassword',value)}
                        >
                            确认密码
                        </InputItem> 
                        <WhiteSpace/>  
                        <RadioItem 
                            checked={this.state.type === 'genius'}
                            onChange={() => this.handleCheange('type','genius')}                            
                        >
                            牛人
                        </RadioItem>
                        <WhiteSpace/> 
                        <RadioItem 
                            checked={this.state.type === 'boss'}
                            onChange={() => this.handleCheange('type','boss')}                            
                        >
                            BOSS
                        </RadioItem>                                                                                                                                                
                    </List>
                    <WhiteSpace/>
                    <Button 
                        type="primary"
                        onClick={this.handleRegister}
                    >
                        注册
                    </Button> 
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => state,
    {register}
)(Register);