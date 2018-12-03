import {
    createAction,
} from 'redux-actions'
import {
    work,
} from 'api'
import {
    createAjaxAction,
    // fakeAjaxAction,
} from 'utils'


/* 请求工作中心列表 */
export const workcenter_list = createAjaxAction(
    work.center_list,
    createAction( 'request work center list' ),
    createAction( 'receive work center list' ),
)

export const workcenter_add = createAjaxAction(
    work.center_add,
    null,
    createAction( 'success add work center' ),
)
