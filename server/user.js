const express = require('express');
const utils = require('utility'); //密码加密
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat')
const _filter = {'password': 0, '_v': 0};//返给前端的值中不能包含这里的内容

Router.get('/list',function(req,res){
    const type = req.query.type;
    // User.remove({},function(err,doc){});
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc});
    })
})

//使用post需要安装body-parser
Router.post('/register',function(req,res){
    const {user, password, type} = req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code: 1,msg: '用户名重复'})
        }
        //两种方法都可以
        const userModel = new User({user, type, password: cmd5(password)});
        userModel.save(function(err, doc){
            if(err){
                return res.json({code: 1,msg: '后端出错'})
            }
            const {user, type, _id} = doc;
            res.cookie('userid',_id);          
            return res.json({code: 0, data: {user, type, _id}})
        })
        // User.create({user, type, password: cmd5(password)},function(err,doc){
        //     if(err){
        //         return res.json({code: 1,msg: '后端出错'})
        //     }
        //     const {user, type, _id} = doc;
        //     res.cookie('userid',_id);          
        //     return res.json({code: 0, data: {user, type, _id}})
        // });
    })
})
//登陆验证
Router.post('/login',function(req,res){
    const {user, password} = req.body;
    User.findOne({user,password:cmd5(password)}, _filter, function(err,doc){
        if(!doc){
            return res.json({code: 1, msg: '用户名或者密码错误'})
        }
        res.cookie('userid', doc._id)//写cookie在res中
        return res.json({code: 0, data: doc})
    }) 
})
//updata
Router.post('/updata',function(req,res){
    const userid = req.cookies.userid;
    if(!userid){
        return res.json({code: 1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        },body);
        return res.json({code: 0, data})
    })
})
//密码加密，自己给密码添加复杂字符串
function cmd5(password){
    const str = 'youre the best@goody~~';
    return utils.md5(utils.md5(password + str));
}

Router.get('/info',function(req,res){
    const {userid} = req.cookies;//读cookie在req中
    if(!userid){
        //用户没有登陆
        return res.json({code:1})
    }
    User.findOne({_id: userid}, _filter, function(err,doc){
        if(err){
            return res.json({code:1, msg: '后端出错了'});
        }
        if(doc){
            return res.json({code:0, data: doc});
        }
    })
    
})

Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid

	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}//avatar头像
        })
        //清除
        // Chat.remove({},function(){})

        //{'$or':[{from:user},{to:user}]} $or是查询多个条件，第一个条件是我发给别人的，第二个是别人发给我的
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})

	})

})
Router.post('/readmsg', function(req, res){
	const userid = req.cookies.userid
    const {from} = req.body
    //不写{'multi':true}则只修改第一条数据，这是因为update默认只修改第一条
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
            if (!err) {
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
        }
    )
})
module.exports = Router;