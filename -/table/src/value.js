function formatMoney(num){
    if(num == undefined || num == '' || num == null){
        return "0.00";
    }
    return num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
function unFormatMoney(num){
    if(num == undefined || num == '' || num == null){
        return "0.00";
    }
    return num.toString().replace(/[,]/g,'')
}
export {formatMoney,unFormatMoney}