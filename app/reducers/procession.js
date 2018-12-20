/* eslint no-prototype-builtins: 0 */
/* eslint no-useless-return: 0 */
import { message } from 'antd'
import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { fn_mes_array } from 'functions'
import Mock from 'mockjs'
// import moment from 'moment'
// const Mock = require( 'mockjs' );
const { Random } = Mock;

const toName = ( item ) => {
    let name = '';
    switch ( item ) {
        case 'strConfigName':
            name = '名称'
            break;
        case 'strConfigNote':
            name = '配置'
            break;
        case 'fConfigRateHours':
            name = '标准工时'
            break;
        case 'fConfigMaxHours':
            name = '最大工时'
            break;
        case 'fConfigMinHours':
            name = '最小工时'
            break;
        case 'strConfigCode':
            name = '配置编码'
            break;
        case 'strMaterialCode':
            name = '物料编码'
            break;
        case 'nMaterialCount':
            name = '物料数量'
            break;
        case 'fMaterialUseRate':
            name = '材料利用率'
            break;
        case 'fMaterialGoodRate':
            name = '良品率'
            break;
        default:
            break;
    }
    return name;
}

/* 工艺路线reducer start */
const initRouteState = {
    list: [],
    loading: false,
}
export const processionRoute = handleActions( {
    'request procession route list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive procession route list'( state, action ) {
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
            Name: `工艺${index}`,

            Number: `process_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            'isQCheck|1': ['是', '否'],
            Hours: Mock.mock( '@natural(0, 24)' ),
            Desc: '-',
            Modifier: Mock.mock( '@cname()' ),
            Founder: Mock.mock( '@cname()' ),
            CreateTime: Random.datetime(),
            UpdateDateTime: Random.now(),
        } ) );

        list = Mock.mock( list );
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },

}, initRouteState )
/* 工艺路线reducer end */

/* 工艺配置reducer start */
const initConfigState = {
    list: [],
    loading: false,
    activeKey: 'base',
    uuid: -1,
    routeConfig: [],
    materialInConfig: [],
    materialOutConfig: [],
    mouldUUID: 0,
}
export const processionConfig = handleActions( {
    'request procession config list'( state, action ) {
        return { ...state, loading: true }
    },
    'receive procession config list'( state, action ) {
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
            Name: `工艺${index}`,

            Number: `process_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            'isQCheck|1': ['是', '否'],
            Hours: Mock.mock( '@natural(0, 24)' ),
            Desc: '-',
            Modifier: Mock.mock( '@cname()' ),
            Founder: Mock.mock( '@cname()' ),
            CreateTime: Random.datetime(),
            UpdateDateTime: Random.now(),
        } ) );

        list = Mock.mock( list );
        res.objectlist = list;
        res.totalcount = Mock.mock( '@natural(0, 65)' );
        return { list: list, total: res.totalcount, loading: false }
    },
    'update config menu key'( state, action ) {
        state.activeKey = action.payload
        return { ...state }
    },
    'set config id'( state, action ) {
        state.uuid = action.payload
        return { ...state }
    },
    'receive procession route config'( state, action ) {
        const { req, res } = action.payload
        const obj = res.data.list[0];
        const keys = Object.keys( obj );
        state.routeConfig = [];
        keys.forEach( ( item, index ) => {
            if ( item !== 'uObjectUUID' && item !== 'uObjectParentUUID' && item !== 'uProcedureUUID' ) {
                state.routeConfig.push( {
                    id: obj.uObjectUUID,
                    key: index,
                    [item]: obj[item],
                    name: toName( item ),
                    name_en: item,
                    value: obj[item],
                    editing: false,
                } )
            }
        } )
        // console.log( 'action', state, action )
        // state.activeKey = action.payload
        return { ...state }
    },
    'receive procession material_in config'( state, action ) {
        const { req, res } = action.payload
        const obj = res.data.list[0];
        const keys = Object.keys( obj );
        state.materialInConfig = [];
        keys.forEach( ( item, index ) => {
            if ( item !== 'uObjectUUID' && item !== 'uObjectParentUUID' && item !== 'uConfigUUID' ) {
                state.materialInConfig.push( {
                    id: obj.uObjectUUID,
                    key: index,
                    [item]: obj[item],
                    name: toName( item ),
                    name_en: item,
                    value: obj[item],
                    editing: false,
                } )
            }
        } )
        // console.log( 'action', state, action )
        // state.activeKey = action.payload
        return { ...state }
    },
    'receive procession material_out config'( state, action ) {
        const { req, res } = action.payload
        const obj = res.data.list[0];
        const keys = Object.keys( obj );
        state.materialOutConfig = [];
        keys.forEach( ( item, index ) => {
            if ( item !== 'uObjectUUID' && item !== 'uObjectParentUUID' && item !== 'uConfigUUID' ) {
                state.materialOutConfig.push( {
                    id: obj.uObjectUUID,
                    key: index,
                    [item]: obj[item],
                    name: toName( item ),
                    name_en: item,
                    value: obj[item],
                    editing: false,
                } )
            }
        } )
        // console.log( 'action', state, action )
        // state.activeKey = action.payload
        return { ...state }
    },
    'receive procession mould config'( state, action ) {
        const { req, res } = action.payload
        const obj = res.data.list[0];
        const keys = Object.keys( obj );
        console.log( '接收到模具配置数据', res )
        state.mouldUUID = obj.uMouldGroupUUID.toString();
        // state.materialOutConfig = [];
        // keys.forEach( ( item, index ) => {
        //     if ( item !== 'uObjectUUID' && item !== 'uObjectParentUUID' && item !== 'uConfigUUID' ) {
        //         state.materialOutConfig.push( {
        //             id: obj.uObjectUUID,
        //             key: index,
        //             [item]: obj[item],
        //             name: toName( item ),
        //             name_en: item,
        //             value: obj[item],
        //             editing: false,
        //         } )
        //     }
        // } )
        // console.log( 'action', state, action )
        // state.activeKey = action.payload
        return { ...state }
    },
    'start edit procession config'( state, action ) {
        const { id, key } = action.payload
        state.routeConfig.forEach( ( item, index ) => {
            if ( item.key === key ) {
                item.editing = true
            }
        } )
        return { ...state }
    },
    'end edit procession config'( state, action ) {
        const { id, key, keyname } = action.payload
        const recive_data = action.payload.data.obj
        console.log( 'action', action )
        state.routeConfig.forEach( ( item, index ) => {
            if ( item.key === key ) {
                item.editing = false
            }
            if ( item.name_en === keyname ) {
                item.value = recive_data[keyname]
            }
        } )
        // state.routeConfig[keyname] = recive_data[keyname]
        return { ...state }
    },
    'start edit material_in config'( state, action ) {
        const { id, key } = action.payload
        state.materialInConfig.forEach( ( item, index ) => {
            if ( item.key === key ) {
                item.editing = true
            }
        } )
        return { ...state }
    },
    'end edit material_in config'( state, action ) {
        const { id, key, keyname } = action.payload
        const receive_data = action.payload.data.obj
        console.log( 'action', action )
        state.materialInConfig.forEach( ( item, index ) => {
            if ( item.key === key ) {
                item.editing = false
            }
            if ( item.name_en === keyname ) {
                item.value = receive_data[keyname]
            }
        } )
        // state.routeConfig[keyname] = recive_data[keyname]
        return { ...state }
    },
    'start edit material_out config'( state, action ) {
        const { id, key } = action.payload
        state.materialOutConfig.forEach( ( item, index ) => {
            if ( item.key === key ) {
                item.editing = true
            }
        } )
        return { ...state }
    },
    'end edit material_out config'( state, action ) {
        const { id, key, keyname } = action.payload
        const receive_data = action.payload.data.obj
        console.log( 'action', action )
        state.materialOutConfig.forEach( ( item, index ) => {
            if ( item.key === key ) {
                item.editing = false
            }
            if ( item.name_en === keyname ) {
                item.value = receive_data[keyname]
            }
        } )
        // state.routeConfig[keyname] = recive_data[keyname]
        return { ...state }
    },


}, initConfigState )
/* 工艺配置reducer end */


/* 工艺 */
const ProcessListState = {
  bomlist: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const process = handleActions( {
  'request process list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive process list'( state, action ) {
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
                    Name: `工艺${index}`,

                    Number: `process_${index}`,
                    'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
                    'isQCheck|1': ['是', '否'],
                    Hours: Mock.mock( '@natural(0, 24)' ),
                    Desc: '-',
                    Modifier: Mock.mock( '@cname()' ),
                    Founder: Mock.mock( '@cname()' ),
                    CreateTime: Random.datetime(),
                    UpdateDateTime: Random.now(),
                } ) )
            list = Mock.mock( list );
            res.objectlist = list;
            res.totalcount = Mock.mock( '@natural(0, 65)' );
            return { list: list, total: res.totalcount, loading: false }
  },

}, ProcessListState )


/* 工艺项 */
const ProcessItemListState = {
  bomItemList: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const processItem = handleActions( {
  'request process item list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive process item list'( state, action ) {
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
                    Name: `工艺${index}`,

                    Number: `ws_${index}`,
                    'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
                    Desc: '-',
                    Modifier: Mock.mock( '@cname()' ),
                    Founder: Mock.mock( '@cname()' ),
                    CreateTime: Random.datetime(),
                    UpdateDateTime: Random.now(),
                } ) )
            list = Mock.mock( list )
            res.objectlist = list;
            res.totalcount = Mock.mock( '@natural(0, 65)' );
            return { workshoplist: list, total: res.totalcount, loading: false }
  },

}, ProcessItemListState )


/* 模拟mqtt动态数据 */
const DataList = JSON.parse( sessionStorage.getItem( 'MockDataList' ) );
const mqttData = {
    List: DataList ? DataList.List : [],
    stateCount: DataList ? DataList.stateCount : [
        {
            x: '报警',
            y: 0,
        },
        {
            x: '离线',
            y: 0,
        },
        {
            x: '运行',
            y: 0,
        },
        {
            x: '待机',
            y: 0,
        },
    ],
}
export const MockMqttData = handleActions( {
  'mock mqtt data'( state, action ) {
    const { wclist } = action.payload
    // console.log('receive mock mqtt req',state,action)
    let list = [];
    // let stateCountList = [];
    const objState = {
        offLine: 0, Standby: 0, Run: 0, Warning: 0,
    };

    if ( !gconfig.isDemo_dev ) {
        return { obj: res.obj.objectlist, loading: false }
    }
    if ( state.List.length == 0 ) {
        list = wclist.map( ( item, index ) => {
            console.log( 'devItem', item )
            return {
                key: index,
                'Status|1': [-1, 0, 1, 2],
                prod_count: Mock.mock( '@natural(0, 200)' ), // 产量
                prod_rate: Mock.mock( '@natural(0, 65)' ), // 产能
                plan: Mock.mock( '@natural(5000, 50000)' ), // 计划
                'product|1': ['RCA3.0', 'Pma端子', 'USB2.0端子', 'RCA6.0', 'HDMI端子'],
                ...item,
            }
        } )
    } else {
        list = wclist.map( ( item, index ) => {
            // console.log('devItem',item)
            state.List.forEach( ( listItem, j ) => {
                if ( item.UUID == listItem.UUID ) {
                    item.key = j
                    item.Status = listItem.Status
                    item.prod_count = listItem.prod_count + Mock.mock( '@natural(0, 20)' ) // 产量
                    item.prod_rate = Mock.mock( '@natural(20, 45)' ) // 产能
                    item.plan = listItem.plan // 计划
                    item.product = listItem.product

                    listItem.Status == -1 ?
                        objState.offLine += 1 :
                        listItem.Status == 0 ?
                        objState.Standby += 1 :
                        listItem.Status == 1 ?
                        objState.Run += 1 :
                        listItem.Status == 2 ?
                        objState.Warning += 1 : ''
                    return item;
                }
                return item;
            } )
            return item;
        } )
    }
    list = Mock.mock( list )
    /* stateCountList = state.stateCount.map( ( item, index ) => {
        // console.log('item',item)
        item.x == '报警' ? item.y = objState.Warning :
            item.x == '离线' ? item.y = objState.offLine :
            item.x == '运行' ? item.y = objState.Run :
            item.x == '待机' ? item.y = objState.Standby : '';
        return item
    } ) */
    // console.log( 'list', list, objState, stateCountList )
    sessionStorage.setItem( 'MockDataList', JSON.stringify( { List: list, stateCount: stateCountList } ) );
    // res.objectlist=list;
    // res.totalcount=Mock.mock('@natural(0, 65)');
    return { List: list, stateCount: stateCountList, loading: false }
  },

}, mqttData )
