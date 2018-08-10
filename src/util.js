//根据user.type决定跳转到/boss还是/genius
//在根据头像user.avatar决定跳转到/boss/info还是/genius/info

export function getRedirectPath({type,avatar}){
    let url = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar){
        url += 'info';
    }
    return url;
}

export function getChatId(userId, targetId){
	return [userId, targetId].sort().join('_')
}
//为了让父级高度包含绝对定位的子集
export function ads(){
    let pageHeight = document.getElementById('chat-page');
    pageHeight.style.height = 'auto';
    let o = pageHeight ?  pageHeight.clientHeight|| pageHeight.offsetHeight: 0;
    let l = window.outerHeight;
    let p = parseInt(o, 10) + 44 + 'px';
    if(parseInt(o, 10) > l && pageHeight){
        pageHeight.style.height = p;
    }
}