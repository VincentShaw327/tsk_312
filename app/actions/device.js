/* global gconfig */
import {
    createAction,
} from 'redux-actions'
import {
    device,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'

/* Device列表数据请求 */
export const requestDeviceList = createAction( 'request device list' );
export const recevieDeviceList = createAction( 'receive device list' );
export const fetchDeviceList = !gconfig.isDemo_dev ? createAjaxAction(
    device.device,
    createAction( 'request device list' ),
    createAction( 'receive device list' ),
) : fakeAjaxAction(
    device.device,
    createAction( 'request device list' ),
    createAction( 'receive device list' ),
)

/* Device_model列表数据请求 */
export const requestDeviceModelList = createAction( 'request device model list' );
export const recevieDeviceModelList = createAction( 'receive device model list' );
export const fetchDeviceModelList = !gconfig.isDemo_dev ? createAjaxAction(
    device.device_model,
    requestDeviceModelList,
    recevieDeviceModelList,
) : fakeAjaxAction(
    device.device_model,
    requestDeviceModelList,
    recevieDeviceModelList,
)

/* Device_type列表数据请求 */
export const requestDeviceTypeList = createAction( 'request device type list' );
export const recevieDeviceTypeList = createAction( 'receive device type list' );
export const device_type_list = !gconfig.isDemo_dev ? createAjaxAction(
    device.device_category_list,
    createAction( 'request device type list' ),
    createAction( 'receive device type list' ),
) : fakeAjaxAction(
    device.device_category_list,
    createAction( 'request device type list' ),
    createAction( 'receive device type list' ),
)

export const device_type_add = createAjaxAction(
    device.device_category_add,
    null,
    createAction( 'success add device type' ),
)
export const device_type_update = createAjaxAction(
    device.device_category_update,
    null,
    createAction( 'success update device type' ),
)
export const device_type_delete = createAjaxAction(
    device.device_category_delete,
    null,
    createAction( 'success delete device type' ),
)

/* 设备型号action 管理 */
export const device_model_list = createAjaxAction(
    device.device_model_list,
    createAction( 'request device model list' ),
    createAction( 'receive device model list' ),
)
export const device_model_add = createAjaxAction(
    device.device_model_add,
    null,
    createAction( 'success add device model' ),
)
export const device_model_update = createAjaxAction(
    device.device_model_update,
    null,
    createAction( 'success update device model' ),
)
export const device_model_delete = createAjaxAction(
    device.device_model_delete,
    null,
    createAction( 'success delete device model' ),
)

/* 设备instance action 管理 */
export const device_equipment_list = createAjaxAction(
    device.device_equipment_list,
    createAction( 'request device equipment list' ),
    createAction( 'receive device equipment list' ),
)
export const device_equipment_add = createAjaxAction(
    device.device_equipment_add,
    null,
    createAction( 'success add device equipment' ),
)
export const device_equipment_update = createAjaxAction(
    device.device_equipment_update,
    null,
    createAction( 'success update device equipment' ),
)
export const device_equipment_delete = createAjaxAction(
    device.device_equipment_delete,
    null,
    createAction( 'success delete device equipment' ),
)


/* 设备brand action 管理 */
export const device_brand_list = createAjaxAction(
    device.device_brand_list,
    createAction( 'request device brand list' ),
    createAction( 'receive device brand list' ),
)
export const device_brand_add = createAjaxAction(
    device.device_brand_add,
    null,
    createAction( 'success add device brand' ),
)
export const device_brand_update = createAjaxAction(
    device.device_brand_update,
    null,
    createAction( 'success update device brand' ),
)
export const device_brand_delete = createAjaxAction(
    device.device_brand_delete,
    null,
    createAction( 'success delete device brand' ),
)


/* Devicee点检记录数据请求 */
export const fetchDeviceCheckList = !gconfig.isDemo_dev ? createAjaxAction(
    device.check,
    createAction( 'request device check list' ),
    createAction( 'receive device check list' ),
) : fakeAjaxAction(
    device.check,
    createAction( 'request device check list' ),
    createAction( 'receive device check list' ),
)
