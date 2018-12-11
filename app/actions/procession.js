import {
    createAction,
} from 'redux-actions'
import {
    procession,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'
/* 模拟mqtt发送消息 */
export const mockMqttData = createAction( 'mock mqtt data' );

/* 工艺路线actions start */
export const route_list = !gconfig.isDemo_dev ? createAjaxAction(
    procession.route_list,
    createAction( 'request procession route list' ),
    createAction( 'receive procession route list' ),
) : fakeAjaxAction(
    procession.route_list,
    createAction( 'request procession route list' ),
    createAction( 'receive procession route list' ),
)
export const route_add = createAjaxAction(
    procession.route_add,
    null,
    createAction( 'success add procession route' ),
)
export const route_update = createAjaxAction(
    procession.route_update,
    null,
    createAction( 'success update procession route' ),
)
export const route_delete = createAjaxAction(
    procession.route_delete,
    null,
    createAction( 'success delete procession route' ),
)
/* 工艺路线actions end */


/* 工艺配置actions start */
export const config_list = !gconfig.isDemo_dev ? createAjaxAction(
    procession.config_list,
    createAction( 'request procession config list' ),
    createAction( 'receive procession config list' ),
) : fakeAjaxAction(
    procession.config_list,
    createAction( 'request procession config list' ),
    createAction( 'receive procession config list' ),
)

export const config_add = createAjaxAction(
    procession.config_add,
    null,
    createAction( 'success add procession config' ),
)
export const config_update = createAjaxAction(
    procession.config_update,
    null,
    createAction( 'success update procession config' ),
)
export const config_delete = createAjaxAction(
    procession.config_delete,
    null,
    createAction( 'success delete procession config' ),
)

export const config_route = createAjaxAction(
    procession.config_list,
    null,
    createAction( 'receive procession route config' ),
)
export const config_material_in = createAjaxAction(
    procession.material_in,
    null,
    createAction( 'receive procession material_in config' ),
)
export const config_material_out = createAjaxAction(
    procession.material_out,
    null,
    createAction( 'receive procession material_out config' ),
)

export const set_id = createAction( 'set config id' );
export const update_menukey = createAction( 'update config menu key' );
export const config_edit = createAction( 'start edit procession config' );
export const config_edit_end = createAction( 'end edit procession config' );
/* 工艺配置actions end */


/* config action start */

/* config action end */
