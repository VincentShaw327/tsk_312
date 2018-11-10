import { ajax } from 'utils'

export const mold = ajax.fetchJSONByPost('api/mold')
export const mold_model = ajax.fetchJSONByPost('api/mold_model')
export const mold_instance = ajax.fetchJSONByPost('api/mould/instance/list_all_by')
