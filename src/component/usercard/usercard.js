import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import { withRouter } from 'react-router-dom';

class UserCard extends React.Component{
    constructor(){
        super()
        this.desc = this.desc.bind(this);
    }
	static propTypes = {
		userlist: PropTypes.array.isRequired
    }
    desc(data){
        return data.desc.split('\n').map(d=>(
            <div className="desc" key={d}>{d}</div>
        ))
	}
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render(){
		const Header = Card.Header
		const Body = Card.Body
		return (
			<WingBlank>
			    <WhiteSpace/>
				{this.props.userlist.map(v=>(
					v.avatar?(<div key={v._id} onClick={()=>this.handleClick(v)}><Card>
						<Header
							title={v.user}
							thumb={require(`../../img/${v.avatar}.png`)}
							extra={<span>{v.title}</span>}
						></Header>
						<Body>
							{v.type==='boss'? <div>公司:{v.company}<WhiteSpace/></div> :null}                    
                            {v.type==='boss' ? <div>职位要求:<WhiteSpace/>{this.desc(v)}</div>
                                            : <div>个人简介:<WhiteSpace/>{this.desc(v)}</div>
                            }
							{v.type==='boss'? <div><WhiteSpace/>薪资:{v.money}</div> :null}
						</Body>
					</Card><WhiteSpace/></div>):null

				))}
			</WingBlank>
		)


	}
}
export default withRouter(UserCard)