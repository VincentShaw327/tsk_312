export const toCols = ( obj, keyName ) => {
    // let cols;
    /* for ( const key in obj ) {
        if ( obj.hasOwnProperty( key ) ) {
            const element = obj[key];
            cols.push( {
                [keyName || 'key']: key,
                val: element,
            } )
        }
    } */
    const keys = Object.keys( obj );
    const cols = keys.map( item => ( {
            [keyName || 'key']: item,
            val: obj[item],
        } ) )
    return cols;
}

export const toFilter = obj => ( {
        // cols:Object.keys(obj),
        cond: {
            equals: toCols( obj ),
        },
    } )

export const toSearch = ( val, arr ) =>
    /* let likes = arr.map((item, index) => {
        return { key: item, val }
    }); */
     ( {
        cond: {
            likes: arr.map( item => ( { key: item, val } ) ),
        },
    } )

