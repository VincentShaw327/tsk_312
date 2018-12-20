import { ajax } from 'utils'

export const account = ajax.fetchJSONByPost( 'api/account' )
export const group = ajax.fetchJSONByPost( 'api/group' )
export const auth = ajax.fetchJSONByPost( 'api/auth' )


export const category_list = ajax.fetchJSONByPost( 'api/user/category/list' )
export const category_add = ajax.fetchJSONByPost( 'api/user/category/add' )
export const category_update = ajax.fetchJSONByPost( 'api/user/category/update' )
export const category_delete = ajax.fetchJSONByPost( 'api/user/category/delete' )

export const instance_list = ajax.fetchJSONByPost( 'api/user/instance/list' )
export const instance_add = ajax.fetchJSONByPost( 'api/user/instance/add' )
export const instance_update = ajax.fetchJSONByPost( 'api/user/instance/update' )
export const instance_delete = ajax.fetchJSONByPost( 'api/user/instance/delete' )

export const auth_item_list = ajax.fetchJSONByPost( 'api/auth/item/list' )
