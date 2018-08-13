import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/user.redux';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            password: '',
            sub: false
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(){
        this.props.login(this.state);
        this.setState({
            sub: true
        })
    }
    handleCheange(key,value){
        this.setState({
            [key]: value,
            sub: false
        })
    }
    register(){
        this.props.history.push('/register');
    }
    render(){
        const Item = List.Item
        return (
            <div>
                {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to= {this.props.redirectTo}/>: null}                
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={(value) => this.handleCheange('user',value)}                                                 
                        >
                            用户
                        </InputItem>
                        <InputItem
                            type='password'
                            onChange={(value) => this.handleCheange('password',value)}                            
                        >
                            密码
                        </InputItem>   
                        {this.state.sub ? <Item className="err">{this.props.msg}</Item> : null}
                    </List>
                    <WhiteSpace/> 
                    <Button type="primary" onClick={this.handleLogin}>
                        登陆
                    </Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>                    
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {login}
)(Login);