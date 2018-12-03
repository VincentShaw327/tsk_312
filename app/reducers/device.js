import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { fn_mes_array } from 'functions'
import { message } from 'antd'

const Mock = require( 'mockjs' );

const Random = Mock.Random;
// import moment from 'moment'

const DeviceListState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const device = handleActions( {
    'request device equipment list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive device equipment list'( state, action ) {
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
    'success delete device equipment'( state, action ) {
        const { req, res } = action.payload;
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        console.log( '删除成功！', res );
        message.success( '删除成功！' );
        const data = res.data;
        const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
        state.list = list;
        return { ...state }
    },
    'success add device equipment'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list.push( data.obj )

        message.success( '添加成功' )
        return { ...state, loading: false }
    },
    'success update device equipment'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list = state.list.filter( item => item.uObjectUUID != data.uuid )
        state.list.push( data.obj )
        message.success( '添加成功' )
        return { ...state, loading: false }
    },

}, DeviceListState )

const DeviceModelListState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const deviceModel = handleActions( {
    'request device model list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive device model list'( state, action ) {
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
    'success delete device model'( state, action ) {
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
    'success add device model'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list.push( data.obj )

        message.success( '添加成功' )
        return { ...state, loading: false }
    },
    'success update device model'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list = state.list.filter( item => item.uObjectUUID != data.uuid )
        state.list.push( data.obj )
        message.success( '添加成功' )
        return { ...state, loading: false }
    },
}, DeviceModelListState )


const DeviceTypeListState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
    loading: false,
}
export const deviceType = handleActions( {
    'request device type list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive device type list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            let data = res.data,
                list = fn_mes_array.addKey( res.data.list, 'key' );
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
    'success delete device type'( state, action ) {
        const { req, res } = action.payload;
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        console.log( '删除成功！', res );
        message.success( '删除成功！' );
        const data = res.data;
        const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
        state.list = list;
        return { ...state }
    },
    'success add device type'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list.push( data.obj )

        message.success( '添加成功' )
        return { ...state, loading: false }
    },
    'success update device type'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list = state.list.filter( item => item.uObjectUUID != data.uuid )
        state.list.push( data.obj )
        message.success( '添加成功' )
        return { ...state, loading: false }
    },


}, DeviceTypeListState )


const brandInitData = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
    loading: false,
}
export const deviceBrand = handleActions( {
    'request device brand list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive device brand list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            let data = res.data,
                list = fn_mes_array.addKey( res.data.list, 'key' );
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
    'success delete device brand'( state, action ) {
        const { req, res } = action.payload;
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        console.log( '删除成功！', res );
        message.success( '删除成功！' );
        const data = res.data;
        const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
        state.list = list;
        return { ...state }
    },
    'success add device brand'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list.push( data.obj )

        message.success( '添加成功' )
        return { ...state, loading: false }
    },
    'success update device brand'( state, action ) {
        const { req, res } = action.payload
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        const data = res.data;
        // list = fn_mes_array.addKey(res.data.list, 'key');
        data.obj.key = data.uuid
        state.list = state.list.filter( item => item.uObjectUUID != data.uuid )
        state.list.push( data.obj )
        message.success( '添加成功' )
        return { ...state, loading: false }
    },


}, brandInitData )

const devCheckState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const DevCheck = handleActions( {
    'request device check list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive device check list'( state, action ) {
        const { req, res } = action.payload
        let list = [];
        if ( hasResponseError( res ) ) {
            message.error( res.msg )
            return { ...state, loading: false }
        }

        if ( !gconfig.isDemo_dev ) {
            return { obj: res.obj.objectlist, loading: false }
        }

        list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            'Name|1': ['注塑设备', '冲压设备', '自动组装设备'],

            DeviceName: `设备_${index}`,
            DeviceID: `DEV_${index}`,

            checkItem: `项目_${Mock.mock( '@natural(0, 10)' )}`,
            // FactoryUUID: item.FactoryUUID,
            // TypeUUID: item.TypeUUID,
            // Name:item.Name,
            ID: `devType_${index}`,
            Number: `ws_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            time: Random.datetime(),
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


}, DeviceTypeListState )
