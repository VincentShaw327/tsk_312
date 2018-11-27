import {
    createAction,
} from 'redux-actions'
import {
    quality,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'

/* 工艺列表请求 */

export const fetchInspectList = !gconfig.isDemo_dev ? createAjaxAction(
    quality.inspect,
    createAction( 'request inspect list' ),
    createAction( 'receive inspect list' ),
) : fakeAjaxAction(
    quality.inspect,
    createAction( 'request inspect list' ),
    createAction( 'receive inspect list' ),
)
export default fetchInspectList;
