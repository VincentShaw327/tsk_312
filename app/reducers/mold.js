import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { fn_mes_array } from 'functions'
const Mock = require('mockjs');
var Random = Mock.Random;
// import moment from 'moment'
import { message } from 'antd'

const MoldListState = {
    list: [],
    modelList:[],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
export const moldList = handleActions({
    'request mold view'(state, action) {
        return { ...state, loading: true }
    },
    'receive mold view'(state, action) {
        const { req, res } = action.payload
        let list = [];
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        else {
            if (!gconfig.isDemo_dev) {
                let data = res.data,
                    list = fn_mes_array.addKey(res.data.list, 'key');
                return {...state, list, loading: false, page: data.page, size: data.size, total: data.total }
            }
            else {
                list = res.objectlist.map((item, index) => {
                    return {
                        UUID: item.UUID,
                        index: index,
                        Name: Mock.mock('@cname'),

                        Number: 'process_' + index,
                        'MoldModelName|1': ['RCA3.0', 'RCA6.0', 'HDMI', 'USB'],
                        'ModelUUID|1': ['RCA3.0', 'RCA6.0', 'HDMI', 'USB'],
                        ID: 'moldmodel_' + index,
                        Label: Mock.mock('@string'),
                        ModelSize: Mock.mock('@natural(0, 24)'),
                        MoldModelSize: Mock.mock('@natural(0, 24)'),
                        Cavity: Mock.mock('@natural(0, 24)'),
                        'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], //类别名称
                        'isQCheck|1': ['是', '否'],
                        Hours: Mock.mock('@natural(0, 24)'),
                        Desc: '-',
                        Modifier: Mock.mock('@cname()'),
                        Founder: Mock.mock('@cname()'),
                        CreateTime: Random.datetime(),
                        UpdateDateTime: Random.now(),
                    }
                })
                list = Mock.mock(list);
                res.objectlist = list;
                res.totalcount = Mock.mock('@natural(0, 65)');
                return { list: list, total: res.totalcount, loading: false }
            }
        }
    },
    'success add mold instance'(state, action) {
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        else {
            let data = res.data;
                // list = fn_mes_array.addKey(res.data.list, 'key');
            data.obj.key=data.uuid
            state.list.push(data.obj)
            
            message.success("添加成功")
            return { ...state, loading: false }
        }
    },
    'success update mold instance'(state, action) {
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        else {
            let data = res.data;
                // list = fn_mes_array.addKey(res.data.list, 'key');
            data.obj.key=data.uuid
            state.list=state.list.filter((item)=>item.uObjectUUID!=data.uuid)
            state.list.push(data.obj)            
            message.success("添加成功")
            return { ...state, loading: false }
        }
    },
    'success delete mold instance'(state, action) {
        const { req, res } = action.payload;
        if (hasResponseError(res)) {
          message.error(res.msg)
          return { ...state, loading: false }
        }
        else{
          console.log('删除成功！', res);
          message.success('删除成功！');
          let data=res.data;
          let list=state.list.filter((item)=>(item.uObjectUUID!=res.data.uuids[0]))
          state.list=list;
          return {...state}
        }
    },
    'receive mold model for add'(state, action) {
        const { req, res } = action.payload
        let list=res.data.list.map((item)=>({value:item.uObjectUUID.toString(),text:item.strMouldCode}))
        return {...state,modelList:list}
    },

}, MoldListState)

const MoldModelState = {
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}

export const moldModel = handleActions({
    'request mold model list'(state, action) {
        return { ...state, loading: true }
    },
    'receive mold model list'(state, action) {
        const { req, res } = action.payload
        let list = [];
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        else {
            if (!gconfig.isDemo_dev) {
                let data = res.data,
                    list = fn_mes_array.addKey(res.data.list, 'key');
                return { list, loading: false, page: data.page, size: data.size, total: data.total }
            }
            else {
                list = res.objectlist.map((item, index) => {
                    return {
                        UUID: item.UUID,
                        key: index,
                        Name: Mock.mock('@cname'),

                        Number: 'process_' + index,
                        'MoldModelName|1': ['RCA3.0', 'RCA6.0', 'HDMI', 'USB'],
                        ID: 'moldmodel_' + index,
                        MoldModelSize: Mock.mock('@natural(0, 24)'),
                        Cavity: Mock.mock('@natural(0, 24)'),
                        'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], //类别名称
                        'isQCheck|1': ['是', '否'],
                        Hours: Mock.mock('@natural(0, 24)'),
                        Desc: '-',
                        Modifier: Mock.mock('@cname()'),
                        Founder: Mock.mock('@cname()'),
                        CreateTime: Random.datetime(),
                        UpdateDateTime: Random.now(),
                    }
                })
                list = Mock.mock(list);
                res.objectlist = list;
                // res.totalcount=Mock.mock('@natural(0, 65)');
                res.totalcount = 20;
                return { list: list, total: res.totalcount, loading: false }
            }
        }
    },
    'success add mold model'(state, action){
      const { req, res } = action.payload;
      if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
      }
      else{
        console.log('添加成功！', res)
        let data=res.data;
        data.obj.key=data.uuid
        state.list.push(data.obj)
        return {...state}
      }
    },
    'success update mold model'(state, action){
      const { req, res } = action.payload;
      if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
      }
      else{
        console.log('修改成功！', res)
        // let data=res.data;
        // data.obj.key=data.uuid
        // state.list.push(data.obj)
        return {...state}
      }
    },
    'success delete mold model'(state, action){
      const { req, res } = action.payload;
      if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
      }
      else{
        console.log('删除成功！', res);
        message.success('删除成功！');
        let data=res.data;
        let list=state.list.filter((item)=>(item.uObjectUUID!=res.data.uuids[0]))
        state.list=list;
        return {...state}
      }
    }

}, MoldModelState)