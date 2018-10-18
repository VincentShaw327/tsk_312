import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
const Mock = require('mockjs');
var Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const ProductReportState = {
  bomlist: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const productReportRata = handleActions({
  'request product report list'(state, action) {
    return { ...state, loading: true }
  },
  'receive product report list'(state, action) {
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
                    index:index,
                    Name:Mock.mock('@cname')
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { workshoplist:list,total:res.totalcount, loading: false }
        }
    }
  },


}, ProductReportState)

const DeviceReportState = {
  bomlist: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const deviceReportData = handleActions({
  'request device report list'(state, action) {
    return { ...state, loading: true }
  },
  'receive device report list'(state, action) {
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
                    index:index,
                    Name:Mock.mock('@cname')
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { workshoplist:list,total:res.totalcount, loading: false }
        }
    }
  },


}, DeviceReportState)

const punchFreqState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const punchFreq = handleActions({
  'request punch freq list'(state, action) {
    return { ...state, loading: true }
  },
  'receive punch freq list'(state, action) {
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
                    devName:'设备_'+index,
                    devID:'dev_'+index,
                    moldID:'mold_'+index,
                    date: Random.date(),
                    freq:Mock.mock('@natural(500000, 700000)'),
                    product:'产品_'+index
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { list:list,total:res.totalcount, loading: false }
        }
    }
  },
}, punchFreqState)
