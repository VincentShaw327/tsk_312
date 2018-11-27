import { ajax } from 'utils'


export const device = ajax.fetchJSONByPost( 'api/device' )
export const check = ajax.fetchJSONByPost( 'api/device/check' )

/* 设备品牌 */
export const device_brand_list = ajax.fetchJSONByPost( 'api/device/brand/list' )
export const device_brand_add = ajax.fetchJSONByPost( 'api/device/brand/add' )
export const device_brand_update = ajax.fetchJSONByPost( 'api/device/brand/update' )
export const device_brand_delete = ajax.fetchJSONByPost( 'api/device/brand/delete' )
/* 设备类别 */
export const device_category_list = ajax.fetchJSONByPost( 'api/device/category/list' )
export const device_category_add = ajax.fetchJSONByPost( 'api/device/category/add' )
export const device_category_update = ajax.fetchJSONByPost( 'api/device/category/update' )
export const device_category_delete = ajax.fetchJSONByPost( 'api/device/category/delete' )
/* 设备型号 */
export const device_model_list = ajax.fetchJSONByPost( 'api/device/model/list' )
export const device_model_add = ajax.fetchJSONByPost( 'api/device/model/add' )
export const device_model_update = ajax.fetchJSONByPost( 'api/device/model/update' )
export const device_model_delete = ajax.fetchJSONByPost( 'api/device/model/delete' )
/* 设备台帐 */
export const device_equipment_list = ajax.fetchJSONByPost( 'api/device/equipment/list' )
export const device_equipment_add = ajax.fetchJSONByPost( 'api/device/equipment/add' )
export const device_equipment_update = ajax.fetchJSONByPost( 'api/device/equipment/update' )
export const device_equipment_delete = ajax.fetchJSONByPost( 'api/device/equipment/delete' )
