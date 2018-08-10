import React from 'react';
import {connect} from 'react-redux'; 
import { List, Badge } from 'antd-mobile';

class Msg extends React.Component{
    getList(arr){
        return arr[arr.length -1];
    }
    handleClick(v){
		this.props.history.push(`/chat/${v}`)
	}
    render(){
        //按照chatid把聊天用户分组
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(element => {
            msgGroup[element.chatid] = msgGroup[element.chatid] || [];
            msgGroup[element.chatid].push(element);

        });
        // const chatList = Object.values(msgGroup);
        const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getList(a).create_time
			const b_last = this.getList(b).create_time
			return b_last - a_last
		})
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        return (
            <div className="msgDiv">
                {chatList.map((v,index) => {
                    const lastItem = this.getList(v);
                    const targetId = lastItem.from === userid ? lastItem.to : lastItem.from;
                    const user = this.props.chat.users[targetId];
                    const unreadNum = v.filter(i => !i.read && i.to === userid).length;
                    return (
                        <List key={lastItem._id} onClick={()=>this.handleClick(targetId)}>
                            <Item 
                                thumb={require(`../../img/${user.avatar}.png`)}
                                extra={<Badge text={unreadNum}></Badge>}
                                arrow="horizontal"
                            >
                                {user.name}
                                <Brief>{lastItem.content}</Brief>
                            </Item>
                        </List>
                    )
                    
                })}
                
            </div>
        )
    }
}

export default connect(
    state => state
)(Msg);