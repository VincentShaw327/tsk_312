import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
const Mock = require('mockjs');
var Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const MaintainState = {
  list: [],
  recordList:[],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const Maintain = handleActions({
  'request maintain program'(state, action) {
    return { ...state, loading: true }
  },
  'receive maintain program'(state, action) {
    const { req, res } = action.payload
    let list=[];
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    else{
        if(!gconfig.isDemo_dev){
            return { obj:res.obj.objectlist, loading: false }
        }
        else{
            list=res.objectlist.map((item,index)=>{
                return{
                    UUID:item.UUID,
                    key:index,
                    pro_Name:"方案-"+index,
                    devSuitable:"*T以上冲压机",
                    // maintainType:[],
                    Name:Mock.mock('@cname'),
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { list:list,total:res.totalcount, loading: false }
        }
    }
  },
  'request maintain history'(state, action) {
    return { ...state, loading: true }
  },
  'receive maintain history'(state, action) {
    const { req, res } = action.payload
    let list=[];
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    else{
        if(!gconfig.isDemo_dev){
            return { obj:res.obj.objectlist, loading: false }
        }
        else{
            list=res.objectlist.map((item,index)=>{
                return{
                    UUID:item.UUID,
                    key:index,
                    pro_Name:"方案-"+index,
                    devSuitable:"*T以上冲压机",
                    // maintainType:[],
                    Name:`ST-${10+index}`,
                    dateTime:Mock.mock('@datetime'),
                    nextDateTime:Mock.mock('@datetime'),
                    ways:'方案-'+Mock.mock('@natural(0, 20)'),
                    // Name:Mock.mock('@cname'),
                    Operator:Mock.mock('@cname'),
                    isAbnormal:Mock.mock('@natural(0, 3)')
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { recordList:list,total:res.totalcount, loading: false }
        }
    }
  },

}, MaintainState)
