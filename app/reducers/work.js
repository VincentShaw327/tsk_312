import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'
import { fn_mes_array } from 'functions'

const Mock = require( 'mockjs' );
// const { Random } = Mock;
// import moment from 'moment'

const initWorkCenterState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const workCenter = handleActions( {
  'request work center list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive work center list'( state, action ) {
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
            TypeUUID: item.TypeUUID,
            Image: item.Image,
            Name: `物料_${index}`,
            Number: `mtrl_${index}`,
            'TypeName|1': ['类型一', '类型二', '类型三'],
            Desc: '-',
            UpdateDateTime: Mock.mock( '@datetime' ),
            Status: 1,
            TypeID: '-',
            Note: '-',
    } ) )
    res.objectlist = list;
    res.totalcount = Mock.mock( '@natural(0, 65)' );
    return { list: list, total: res.totalcount, loading: false }
  },

}, initWorkCenterState )


export default workCenter;
