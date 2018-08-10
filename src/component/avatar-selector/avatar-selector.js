import React from 'react';
import { Grid, List } from 'antd-mobile';
import propTypes  from 'prop-types';
class AvatarSelector extends React.Component{
    //类型检测
    static propTypes ={
        selectAvatar: propTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        const avatarList = [
            'boy','girl','man','woman','bull',
            'hedgehog','hippopotamus','koala',
            'lemur','crab','pig','tiger','whale',
            'chick','zebra'
        ].map(value => ({
            icon: require(`../../img/${value}.png`),
            text: value
        }))
        const gridHeader = this.state.text ? 
                            (<div className="icon">
                                <span className="icon-span">已选头像:</span>
                                <img  className="icon-img" src={this.state.icon} alt=""/>
                            </div>) : (<div className="icon">请选择头像</div>);
        return (
            <div>
                <List renderHeader={gridHeader}>
                    <Grid data={avatarList} onClick={event => {
                        this.props.selectAvatar(event.text);
                        this.setState(event)
                    }}/>
                </List>
                
            </div>
        )
    }
}
export default AvatarSelector;