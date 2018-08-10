import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';




class User extends React.Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}
	logout(){
		const alert = Modal.alert

		alert('注销', '确认退出登录吗???', [
			{ text: '取消', onPress: () => null},
			{ text: '确认', onPress: () => {
				browserCookie.erase('userid')
				this.props.logoutSubmit()
			}}
		])
	}
    render(){
        const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return props.user?(
			<div>
				<Result
				    img={<img src={require(`../../img/${props.avatar}.png`)} style={{width:50}} alt="" />}
					title={props.user}
					message={props.type==='boss'?<div>公司:{props.company}</div>:null}
				/>
				
				<List renderHeader={()=>'简介'}>
					<Item
						multipleLine
					>
						<Brief>
							{props.type==='boss' ? '招聘职位:' : '求职岗位:'}{props.title}
						</Brief>
						<WhiteSpace/>
                        <Brief>{props.type==='boss' ? '职位要求:' : '个人简介:'}</Brief>
						{props.desc.split('\n').map(v=><div className="brief"><Brief key={v}>{v}</Brief></div>)}
						<WhiteSpace/>
						{props.money?<Brief>薪资:{props.money}</Brief>:null}
					</Item>
					
				</List>
				<WhiteSpace/>
				<List>
					<Button type="primary" onClick={this.logout}>退出登录</Button>
				</List>
			</div>
        ): props.redirectTo ? <Redirect to= {props.redirectTo}/>: null;
    }
}


export default connect(
	state=> state.user,
	{logoutSubmit}
)(User)