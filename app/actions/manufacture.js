import {
  createAction,
} from 'redux-actions'
import {
    manufacture
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'


/*请求*/
export const requestOrderList = createAction('request order list');
export const recevieOrderList = createAction('receive order list');
export const fetchOrderList = !gconfig.isDemo_dev?createAjaxAction(
    manufacture.manufacture,
    requestOrderList,
    recevieOrderList
):fakeAjaxAction(
    manufacture.manufacture,
    requestOrderList,
    recevieOrderList
)


/*请求*/
export const requestTaskList = createAction('request task list');
export const recevieTaskList = createAction('receive task list');
export const fetchTaskList = !gconfig.isDemo_dev?createAjaxAction(
    manufacture.manufacture,
    requestTaskList,
    recevieTaskList
):fakeAjaxAction(
    manufacture.manufacture,
    requestTaskList,
    recevieTaskList
)
