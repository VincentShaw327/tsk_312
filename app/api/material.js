import { ajax } from 'utils'

export const category_list = ajax.fetchJSONByPost( 'api/material/category/list' )
export const category_add = ajax.fetchJSONByPost( 'api/material/category/add' )
export const category_update = ajax.fetchJSONByPost( 'api/material/category/update' )
export const category_delete = ajax.fetchJSONByPost( 'api/material/category/delete' )

export const item_list = ajax.fetchJSONByPost( 'api/material/item/list' )
export const item_add = ajax.fetchJSONByPost( 'api/material/item/add' )
export const item_update = ajax.fetchJSONByPost( 'api/material/item/update' )
export const item_delete = ajax.fetchJSONByPost( 'api/material/item/delete' )
