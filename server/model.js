const mongoose = require('mongoose');

//连接mongo，并且使用imooc-chat这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat';
mongoose.connect(DB_URL);
// mongoose.connection.on('connected',function(){
//     console.log('mongo success')
// })

const models = {
    user: {
        'user': {'type': String, 'require': true},
        'password': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        //头像
        'avatar': {'type':String},
        //个人简介
        'desc': {'type': String},
        //职位名称
        'title': {'type':String},
        //如果是Boss，还要有公司名和工资
        'company': {'type':String},
        'money': {'type':String},
    },
    chat:{
		'chatid':{'type':String, 'require':true},
		'from':{'type':String,'require':true},
		'to':{'type':String,'require':true},
		'read':{'type':Boolean,'default':false},
		'content':{'type':String,'require':true,'default':''},
		'create_time':{'type':Number,'default':Date.now}
	}
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name){
        return mongoose.model(name);
    }
}