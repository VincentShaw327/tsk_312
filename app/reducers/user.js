import { message } from 'antd'
import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import Mock from 'mockjs'
import { fn_mes_array } from 'functions'

const { Random } = Mock;

const initRoleState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const UserRole = handleActions( {
  'request user role list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive user role list'( state, action ) {
    const { req, res } = action.payload
    let list = [];
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }
    if ( !gconfig.isDemo_dev ) {
        const { data } = res;
        const list = fn_mes_array.addKey( res.data.list, 'key' );
        const pagenation = {
            page: data.page,
            size: data.size,
            total: data.total,
        }
        return {
            ...state,
            list,
            loading: false,
            ...pagenation,
        }
    }
    if ( !gconfig.isDemo_dev ) {
        return { obj: res.obj.objectlist, loading: false }
    }
    list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            Name: `user_${index}`,

            LoginName: Mock.mock( '@cname' ),
            Email: Random.email(),
            Mobile: '13800001111',
            Phone: '0755-23455432',
            Number: `process_${index}`,
            ID: `moldmodel_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            Desc: '-',
            Note: '-',
            Modifier: Mock.mock( '@cname()' ),
            Founder: Mock.mock( '@cname()' ),
            CreateTime: Random.datetime(),
            ActiveDateTime: Random.datetime(),
            UpdateDateTime: Random.now(),
        } ) )
    list = Mock.mock( list );
    res.objectlist = list;
    // res.totalcount=Mock.mock('@natural(0, 65)');
    res.totalcount = 20;
    return { list: list, total: res.totalcount, loading: false }
  },
  'success add user role'( state, action ) {
    const { req, res } = action.payload
    if ( hasResponseError( res ) ) {
        message.error( res.msg )
        return { ...state, loading: false }
    }
    if ( !gconfig.isDemo_dev ) {
        const { data } = res;
        const newObj = data.obj;
        newObj.key = data.uuid;
        state.list.push( newObj )
        console.log( '成功添加', res )
        // const list = fn_mes_array.addKey( res.data.list, 'key' );
        const pagenation = {
            page: data.page,
            size: data.size,
            total: data.total,
        }
        return {
        ...state, loading: false, ...pagenation,
        }
    }
    return { ...state, loading: false }
   },
  'success update user role'( state, action ) {
    const { req, res } = action.payload
    const u_item = res.data;
    console.log( '成功更新', res );
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }
    const list = state.list.map( ( item ) => {
      // console.log( 'item', item )
      if ( item.uObjectUUID === u_item.uuid ) {
        Object.assign( item, u_item.obj )
      }
      return item;
    } );
    return { ...state, list, loading: false }
  },
  'success delete user role'( state, action ) {
    const { req, res } = action.payload;
    if ( hasResponseError( res ) ) {
        message.error( res.msg )
        return { ...state, loading: false }
    }
    console.log( '删除成功！', res );
    message.success( '删除成功！' );
    const list = state.list.filter( item => ( item.uObjectUUID != res.data.uuids[0] ) )
    state.list = list;
    return { ...state }
  },

}, initRoleState )


const UserAccountState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const UserAccount = handleActions( {
  'request user account list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive user account list'( state, action ) {
    const { req, res } = action.payload
    let list = [];
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }

    if ( !gconfig.isDemo_dev ) {
      const { data } = res;
      const list = fn_mes_array.addKey( res.data.list, 'key' );
      const pagenation = {
          page: data.page,
          size: data.size,
          total: data.total,
      }
      return {
          ...state,
          list,
          loading: false,
          ...pagenation,
      }
    }
    list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            Name: `user_${index}`,

            LoginName: Mock.mock( '@cname' ),
            Email: Random.email(),
            Mobile: '13800001111',
            Phone: '0755-23455432',
            Number: `process_${index}`,
            ID: `moldmodel_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            Desc: '-',
            Note: '-',
            Modifier: Mock.mock( '@cname()' ),
            Founder: Mock.mock( '@cname()' ),
            CreateTime: Random.datetime(),
            ActiveDateTime: Random.datetime(),
            UpdateDateTime: Random.now(),
    } ) )
    list = Mock.mock( list );
    res.objectlist = list;
    // res.totalcount=Mock.mock('@natural(0, 65)');
    res.totalcount = 20;
    return { list: list, total: res.totalcount, loading: false }
  },
  'success add account'( state, action ) {
    const { req, res } = action.payload
    if ( hasResponseError( res ) ) {
        message.error( res.msg )
        return { ...state, loading: false }
    }
    if ( !gconfig.isDemo_dev ) {
        const { data } = res;
        const newObj = data.obj;
        newObj.key = data.uuid;
        state.list.push( newObj )
        console.log( '成功添加', res )
        // const list = fn_mes_array.addKey( res.data.list, 'key' );
        const pagenation = {
            page: data.page,
            size: data.size,
            total: data.total,
        }
        return {
        ...state, loading: false, ...pagenation,
        }
    }
    return { ...state, loading: false }
  },
  'success update account'( state, action ) {
    const { req, res } = action.payload
    const u_item = res.data;
    console.log( '成功更新', res );
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }
    const list = state.list.map( ( item ) => {
      // console.log( 'item', item )
      if ( item.uObjectUUID === u_item.uuid ) {
        Object.assign( item, u_item.obj )
      }
      return item;
    } );
    return { ...state, list, loading: false }
  },
  'success delete account'( state, action ) {
    const { req, res } = action.payload;
    if ( hasResponseError( res ) ) {
        message.error( res.msg )
        return { ...state, loading: false }
    }
    console.log( '删除成功！', res );
    message.success( '删除成功！' );
    const list = state.list.filter( item => ( item.uObjectUUID !== res.data.uuids[0] ) )
    state.list = list;
    return { ...state }
  },

}, UserAccountState )

/* 用户权限组 */
const UserGroupState = {
  list: [],
  user_auth: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const UserGroup = handleActions( {
  'request user group list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive user group list'( state, action ) {
    const { req, res } = action.payload
    let list = [];
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }

        if ( !gconfig.isDemo_dev ) {
            return { obj: res.obj.objectlist, loading: false }
        }

            list = res.objectlist.map( ( item, index ) => ( {
                    UUID: item.UUID,
                    key: index,
                    Name: `权限组_${index}`,

                    LoginName: Mock.mock( '@cname' ),
                    Email: Random.email(),
                    Mobile: '13800001111',
                    Phone: '0755-23455432',
                    Number: `process_${index}`,
                    ID: `moldmodel_${index}`,
                    'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
                    Desc: '-',
                    Note: '-',
                    Modifier: Mock.mock( '@cname()' ),
                    Founder: Mock.mock( '@cname()' ),
                    CreateTime: Random.datetime(),
                    ActiveDateTime: Random.datetime(),
                    UpdateDateTime: Random.now(),
                } ) )
            list = Mock.mock( list );
            res.objectlist = list;
            res.totalcount = Mock.mock( '@natural(0, 65)' );
            return { list: list, total: res.totalcount, loading: false }
  },
  'request user auth item list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive user auth item list'( state, action ) {
    const { req, res } = action.payload
    let list = [];
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }

    if ( !gconfig.isDemo_dev ) {
      const { data } = res;
      const auth_list = fn_mes_array.addKey( res.data.list, 'key' );
      const pagenation = {
          page: data.page,
          size: data.size,
          total: data.total,
      }
      return {
          ...state,
          // list,
          user_auth: auth_list,
          loading: false,
          ...pagenation,
      }
    }
    list = res.objectlist.map( ( item, index ) => ( {
            UUID: item.UUID,
            key: index,
            Name: `权限组_${index}`,

            LoginName: Mock.mock( '@cname' ),
            Email: Random.email(),
            Mobile: '13800001111',
            Phone: '0755-23455432',
            Number: `process_${index}`,
            ID: `moldmodel_${index}`,
            'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
            Desc: '-',
            Note: '-',
            Modifier: Mock.mock( '@cname()' ),
            Founder: Mock.mock( '@cname()' ),
            CreateTime: Random.datetime(),
            ActiveDateTime: Random.datetime(),
            UpdateDateTime: Random.now(),
        } ) )
    list = Mock.mock( list );
    res.objectlist = list;
    res.totalcount = Mock.mock( '@natural(0, 65)' );
    return { list: list, total: res.totalcount, loading: false }
  },

}, UserGroupState )


/* 用户权限 */
const UserAuthState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const UserAuth = handleActions( {
  'request user auth list'( state, action ) {
    return { ...state, loading: true }
  },
  'receive user auth list'( state, action ) {
    const { req, res } = action.payload
    let list = [];
    if ( hasResponseError( res ) ) {
      message.error( res.msg )
      return { ...state, loading: false }
    }

        if ( !gconfig.isDemo_dev ) {
            return { obj: res.obj.objectlist, loading: false }
        }

            list = res.objectlist.map( ( item, index ) => ( {
                    UUID: item.UUID,
                    key: index,
                    Name: `权限_${index}`,
                    Code: `auth_${index}`,

                    LoginName: Mock.mock( '@cname' ),
                    Email: Random.email(),
                    Mobile: '13800001111',
                    Phone: '0755-23455432',
                    Number: `process_${index}`,
                    ID: `moldmodel_${index}`,
                    'TypeName|1': ['自动组装车间', '注塑车间', '冲压车间'], // 类别名称
                    Desc: '-',
                    Note: '-',
                    Modifier: Mock.mock( '@cname()' ),
                    Founder: Mock.mock( '@cname()' ),
                    CreateTime: Random.datetime(),
                    ActiveDateTime: Random.datetime(),
                    UpdateDateTime: Random.now(),
                } ) )
            list = Mock.mock( list );
            res.objectlist = list;
            res.totalcount = Mock.mock( '@natural(0, 65)' );
            return { list: list, total: res.totalcount, loading: false }
  },

}, UserAuthState )
