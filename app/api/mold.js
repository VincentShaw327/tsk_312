import { ajax } from 'utils'

export const mold = ajax.fetchJSONByPost('api/mold')

export const mold_model_list = ajax.fetchJSONByPost('api/mould/model/list')
export const mold_model_add = ajax.fetchJSONByPost('api/mould/model/add')
export const mold_model_update = ajax.fetchJSONByPost('api/mould/model/update')
export const mold_model_delete = ajax.fetchJSONByPost('api/mould/model/delete')

export const mold_instance = ajax.fetchJSONByPost('api/mould/instance/list')
export const mold_instance_add = ajax.fetchJSONByPost('api/mould/instance/add')
export const mold_instance_update = ajax.fetchJSONByPost('api/mould/instance/update')
export const mold_instance_delete = ajax.fetchJSONByPost('api/mould/instance/delete')

export const mold_view = ajax.fetchJSONByPost('api/mould/instance/view')
