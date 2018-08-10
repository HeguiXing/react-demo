import axios from 'axios';
import {getRedirectPath} from '../util';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';//刷新页面后从cookie中获得初始值
const LOGOUT = 'LOGOUT';
//redirectTo跳转到哪，isAuth是否登陆
const initState = {
    redirectTo:'',
    msg: '',
    user: '',
    passowrd: '',
    tyoe: ''
}

export function user(state= initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case LOGOUT: 
            return {...initState, redirectTo: '/login'}
        default:
            return state;
    }
}
function errorMsg(msg){
    return {type: ERROR_MSG, msg: msg}
}
function authSuccess(data){
    return {type: AUTH_SUCCESS,payload: data}
}

export function loadData(data){
    return {type:LOAD_DATA, payload: data}
}

export function login({user, password}){
    if(!user || !password){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login',{user, password})
            .then(res => {
                console.log(res.data)
                if(res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register({user, password, repeatpassword, type}){
    if(!user || !password || !type){
        return errorMsg('用户名密码必须输入')
    }   
    if(password !== repeatpassword){
        return errorMsg('两次填写的密码不一致')
    }
    return dispatch => {
        axios.post('/user/register',{user, password, type})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess({user, password, type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function updata(data){
    return dispatch => {
        axios.post('/user/updata',data)
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function logoutSubmit(){
    return {type: LOGOUT}
}