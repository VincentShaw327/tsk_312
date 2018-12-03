import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { fn_mes_array } from 'functions'
import { message } from 'antd'

const Mock = require( 'mockjs' );

const { Random } = Mock;
// import moment from 'moment'

const initCategoryState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const productCategory = handleActions( {
    'request product category list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive product category list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
                ...state,
                list,
                loading: false,
                ...pagenation,
            }
        }

        list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            TypeUUID: item.TypeUUID,
            Image: item.Image,
            Name: `产品_${index}`,
            Number: `product_${index}`,
            SN: Mock.mock( '@word' ),
            Version: 'Version~',
            Desc: '~',
            UpdateDateTime: Mock.mock( '@datetime' ),
        } ) )
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },


}, initCategoryState )


const initListState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const productList = handleActions( {
    'request product model list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive product model list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
                ...state,
                list,
                loading: false,
                ...pagenation,
            }
        }

        list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            TypeUUID: item.TypeUUID,
            Image: item.Image,
            Name: `产品_${index}`,
            Number: `product_${index}`,
            SN: Mock.mock( '@word' ),
            Version: 'Version~',
            Desc: '~',
            UpdateDateTime: Mock.mock( '@datetime' ),
        } ) )
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },


}, initListState )
