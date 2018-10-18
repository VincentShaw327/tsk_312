import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
const Mock = require('mockjs');
var Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const CollateState = {
  list: [],

}
export const MtrlLossCollate = handleActions({
  'request mtrl loss collate'(state, action) {
    return { ...state, loading: true }
  },
  'receive mtrl loss collate'(state, action) {
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
                    workOrder:'STWO20181014234',
                    product:'产品'+index,
                    productWeight:Mock.mock('@natural(0, 24)'),
                    materialWeight:Mock.mock('@natural(0, 24)'),
                    thrDissRate:Mock.mock('@natural(75, 88)')+'%',
                    actDissRate:Mock.mock('@natural(30, 80)')+'%',
                    progress:Mock.mock('@natural(0, 24)'),
                    'MoldModelName|1':['RCA3.0','RCA6.0','HDMI','USB'],
                    'ModelUUID|1':['RCA3.0','RCA6.0','HDMI','USB'],
                    ID:'moldmodel_'+index,
                    Label:Mock.mock('@string'),
                    ModelSize:Mock.mock('@natural(0, 24)'),
                    MoldModelSize:Mock.mock('@natural(0, 24)'),
                    Cavity:Mock.mock('@natural(0, 24)'),
                    'TypeName|1':['自动组装车间','注塑车间','冲压车间'], //类别名称
                    'isQCheck|1':['是','否'],
                    Hours:Mock.mock('@natural(0, 24)'),
                    Desc:'-',
                    Modifier:Mock.mock('@cname()'),
                    Founder:Mock.mock('@cname()'),
                    CreateTime:Random.datetime(),
                    UpdateDateTime:Random.now(),
                }
            })
            list=Mock.mock(list);
            res.objectlist=list;
            res.totalcount=Mock.mock('@natural(0, 65)');
            return { list:list,total:res.totalcount, loading: false }
        }
    }
  },

}, CollateState)
