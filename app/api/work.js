import { ajax } from 'utils'

export const center_list = ajax.fetchJSONByPost( 'api/work/center/list' )
export const center_add = ajax.fetchJSONByPost( 'api/work/center/add' )
export const center_update = ajax.fetchJSONByPost( 'api/work/center/update' )
export const center_delete = ajax.fetchJSONByPost( 'api/work/center/delete' )
