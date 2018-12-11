import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'

const Mock = require( 'mockjs' );

const Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const inspectState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const Inspect = handleActions( {
  'request inspect list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive inspect list'( state, action ) {
    const { req, res } = action.payload
    let list = [];
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }

        if ( !gconfig.isDemo_dev ) {
            return { list: res.data.list, loading: false }
        }

            list = res.objectlist.map( ( item, index ) => ( {
                    UUID: item.UUID,
                    key: index,
                    Name: Mock.mock( '@cname' ),
                    workOrder: `T20181024_${49275 + index}`,
                    productDraw: '-',
                    inspectDraw: '-',
                    'center|1': ['ST-01', 'ST-02', 'ST-03', 'ST-04', 'ST-05', 'ST-06'],
                    inspectTime: Random.datetime(),
                    Inspector: Mock.mock( '@cname()' ),
                    samples: 20,
                    // qualified:Mock.mock('@natural(12, 20)'),
                    defective: Mock.mock( '@natural(0, 8)' ),
                    PassRate: Mock.mock( '@natural(85, 100)' ),
                    Renewing: Mock.mock( '@natural(0, 1)' ),
                    'inspectType|1': ['首检', '抽检', '末检'],
                } ) )
            list = Mock.mock( list );
            res.objectlist = list;
            res.totalcount = Mock.mock( '@natural(0, 65)' );
            return { list: list, total: res.totalcount, loading: false }
  },


}, inspectState )
export default Inspect;
