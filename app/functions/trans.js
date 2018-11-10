export const toCols=(obj)=>{
    let cols=[];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            cols.push({
                key:key,
                val:element
            })
        }
    }
    return cols;
}