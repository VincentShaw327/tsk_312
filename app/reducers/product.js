import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
const Mock = require('mockjs');
var Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const productModelListState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const productModel = handleActions({
  'request product model list'(state, action) {
    return { ...state, loading: true }
  },
  'receive product model list'(state, action) {
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
                    UUID : item.UUID,
                    TypeUUID: item.TypeUUID,
                    Image:item.Image,
                    Name:'产品_'+index,
                    Number:"product_"+index,
                    SN:Mock.mock('@word'),
                    Version:'Version~',
                    Desc:'~',
                    UpdateDateTime:Mock.mock('@datetime'),
                }
            })
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { list:list,total:res.totalcount, loading: false }
        }
    }
  },


}, productModelListState)
