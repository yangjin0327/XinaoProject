
let str = window.location.href
let tbProjectIds = '';
let userids = ''
str.split('?')[1].split('&').forEach((item,index)=>{
    if(item.split('=')[0] === '_userId'){
        userids = item.split('=')[1]
    }else if(item.split('=')[0] === '_userId' === 'project'){
        tbProjectIds = item.split('=')[1]
    }
})
export function tbProjectId(){
    return tbProjectIds
}
export function userid(){
    return userids
}