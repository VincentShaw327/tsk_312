/*
*系统设置
*/
export const userList={
    path:'/setting/user_list',
    component:() =>import( '../../pages/TUser/TUserList' )
}

export const AuthList={
    path:'/setting/auth_list',
    component:() =>import( '../../pages/TUser/TAuthList' )
}

export const AuthGroup={
    path:'/setting/auth_group_list',
    component:() =>import( '../../pages/TUser/TAuthGroupList' )
}
