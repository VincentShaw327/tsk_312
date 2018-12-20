import { ajax } from 'utils'

export const crafts = ajax.fetchJSONByPost( 'api/process' )
export const crafts_item = ajax.fetchJSONByPost( 'api/process_item' )
export const workcenter = ajax.fetchJSONByPost( 'api/workcenter' )
export const workcenter_type = ajax.fetchJSONByPost( 'api/workcenter_types' )


export const route_list = ajax.fetchJSONByPost( 'api/procession/route/list' )
export const route_add = ajax.fetchJSONByPost( 'api/procession/route/add' )
export const route_update = ajax.fetchJSONByPost( 'api/procession/route/update' )
export const route_delete = ajax.fetchJSONByPost( 'api/procession/route/delete' )


export const config_list = ajax.fetchJSONByPost( 'api/procession/config/list' )
export const config_add = ajax.fetchJSONByPost( 'api/procession/config/add' )
export const config_update = ajax.fetchJSONByPost( 'api/procession/config/update' )
export const config_delete = ajax.fetchJSONByPost( 'api/procession/config/delete' )

export const material_in = ajax.fetchJSONByPost( 'api/procession/material_in/list' )
export const material_in_update = ajax.fetchJSONByPost( 'api/procession/material_in/update' )
export const material_out = ajax.fetchJSONByPost( 'api/procession/material_out/list' )
export const material_out_update = ajax.fetchJSONByPost( 'api/procession/material_out/update' )

export const config_mould = ajax.fetchJSONByPost( 'api/procession/config_mould/list' )
// export const config_mould_add = ajax.fetchJSONByPost( 'api/procession/config_mould/add' )
// export const config_mould_update = ajax.fetchJSONByPost( 'api/procession/config_mould/update' )
// export const config_mould_delete = ajax.fetchJSONByPost( 'api/procession/config_mould/delete' )

