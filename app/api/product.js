import { ajax } from 'utils'

export const category_list = ajax.fetchJSONByPost( 'api/product/category/list' )
export const category_add = ajax.fetchJSONByPost( 'api/product/category/add' )
export const category_update = ajax.fetchJSONByPost( 'api/product/category/update' )
export const category_delete = ajax.fetchJSONByPost( 'api/product/category/delete' )

export const model_list = ajax.fetchJSONByPost( 'api/product/model/list' )
export const model_add = ajax.fetchJSONByPost( 'api/product/model/add' )
export const model_update = ajax.fetchJSONByPost( 'api/product/model/update' )
export const model_delete = ajax.fetchJSONByPost( 'api/product/model/delete' )
