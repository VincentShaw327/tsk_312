export const toCols = (obj, keyName) => {
    let cols = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            cols.push({
                [keyName ? keyName : 'key']: key,
                val: element
            })
        }
    }
    return cols;
}

export const toFilter = (obj) => {
    return {
        // cols:Object.keys(obj),
        cond: {
            equals: toCols(obj)
        }
    };
}

export const toSearch = (val, arr) => {
    /* let likes = arr.map((item, index) => {
        return { key: item, val }
    }); */


    return {
        cond: {
            likes: arr.map((item)=>({key:item,val}))
        }
    };
}