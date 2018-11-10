export const addKey=(arr,keyName)=>{
    if(arr&&Array.isArray(arr)&&keyName){
        return arr.map((item,index)=>Object.assign(item,{[keyName]:index}))
    }
    else{
        return alert("请传入正确的参数")
    }
}