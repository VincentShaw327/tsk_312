/*
*系统设置
*/
export const role = {
    path: '/setting/role',
    component: () => import( /* webpackChunkName: "role" */ '../pages/TUser/role' ),
}

export const userList = {
    path: '/setting/user_list',
    component: () => import( /* webpackChunkName: "TUserList" */ '../pages/TUser/TUserList' ),
}

export const AuthList = {
    path: '/setting/auth_list',
    component: () => import( /* webpackChunkName: "TAuthList" */ '../pages/TUser/TAuthList' ),
}

export const AuthGroup = {
    path: '/setting/auth_group_list',
    component: () => import( /* webpackChunkName: "authgroup" */ '../pages/TUser/authgroup' ),
}
