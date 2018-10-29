import { ajax } from 'utils'

export const manufacture = ajax.fetchJSONByPost('api/manufacture')
export const feeding = ajax.fetchJSONByPost('api/feeding')
