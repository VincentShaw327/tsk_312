import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { fn_mes_array } from 'functions'
import { message } from 'antd'
import Mock from 'mockjs'

const { Random } = Mock;

const initCategoryState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const materialCategory = handleActions( {
    'request material category list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive material category list'( state, action ) {
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
                ...state, list, loading: false, ...pagenation,
            }
        }

        list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            'Name|1': ['注塑设备', '冲压设备', '自动组装设备'],

            // FactoryUUID: item.FactoryUUID,
            // TypeUUID: item.TypeUUID,
            // Name:item.Name,
            ID: `devType_${index}`,
            Number: `ws_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            Desc: '-',
            Modifier: Mock.mock( '@cname()' ),
            Founder: Mock.mock( '@cname()' ),
            CreateTime: Random.datetime(),
            UpdateDateTime: Random.now(),
            // Note:item.Note,
            // TypeID:item.TypeID, //类别编号
        } ) )
        list = Mock.mock( list );
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },
    'success add material category'( state, action ) {
        const { req, res } = action.payload
        const list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const newObj = data.obj;
            newObj.key = data.uuid;
            state.list.push( newObj )
            console.log( '成功添加', res )
            // const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
            ...state, loading: false, ...pagenation,
            }
        }
        return { list: list, total: res.totalcount, loading: false }
    },
    'success update material category'( state, action ) {
        const { req, res } = action.payload
        const u_item = res.data;
        console.log( '成功更新', res );
        if ( hasResponseError( res ) ) {
          message.error( res.msg )
          return { ...state, loading: false }
        }
        const list = state.list.map( ( item ) => {
          // console.log( 'item', item )
          if ( item.uObjectUUID === u_item.uuid ) {
            Object.assign( item, u_item.obj )
          }
          return item;
        } );
        return { ...state, list, loading: false }
    },
    'success delete material category'( state, action ) {
        const { req, res } = action.payload;
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }
        console.log( '删除成功！', res );
        message.success( '删除成功！' );
        const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
        state.list = list;
        return { ...state }
    },

}, initCategoryState )


const initListState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const materialList = handleActions( {
    'request material item list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive material item list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            const data = res.data;
            const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
                ...state, list, loading: false, ...pagenation,
            }
        }

        list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            'Name|1': ['注塑设备', '冲压设备', '自动组装设备'],

            // FactoryUUID: item.FactoryUUID,
            // TypeUUID: item.TypeUUID,
            // Name:item.Name,
            ID: `devType_${index}`,
            Number: `ws_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            Desc: '-',
            Modifier: Mock.mock( '@cname()' ),
            Founder: Mock.mock( '@cname()' ),
            CreateTime: Random.datetime(),
            UpdateDateTime: Random.now(),
            // Note:item.Note,
            // TypeID:item.TypeID, //类别编号
        } ) )
        list = Mock.mock( list );
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },
    'success delete material item'( state, action ) {
        const { req, res } = action.payload;
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        message.success( '删除成功！' );
        const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
        state.list = list;
        return { ...state }
    },
    'success add material item'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }
        if ( !gconfig.isDemo_dev ) {
            const { data } = res;
            const newObj = data.obj;
            newObj.key = data.uuid;
            state.list.push( newObj )
            console.log( '成功添加', res )
            // const list = fn_mes_array.addKey( res.data.list, 'key' );
            const pagenation = {
                page: data.page,
                size: data.size,
                total: data.total,
            }
            return {
            ...state, loading: false, ...pagenation,
            }
        }
        return { ...state, loading: false }
    },
    'success update material item'( state, action ) {
        const { req, res } = action.payload
        const u_item = res.data;
        console.log( '成功更新', res );
        if ( hasResponseError( res ) ) {
          message.error( res.msg )
          return { ...state, loading: false }
        }
        const list = state.list.map( ( item ) => {
          // console.log( 'item', item )
          if ( item.uObjectUUID === u_item.uuid ) {
            Object.assign( item, u_item.obj )
          }
          return item;
        } );
        return { ...state, list, loading: false }
    },
}, initListState )
