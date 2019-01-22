export default (() => {
  window.gconfig = {};
  +(function (global) {
    // 本地开发打开的路径以及端口
    // global.linkUrl = 'http://localhost:9000/';
    // global.linkUrl = 'http://192.168.3.9/';
    global.linkUrl = 'http://dev.mes.top-link.me/';
    // global.linkUrl = 'http://localhost:3000/';
    // global.linkUrl = 'http://dev.mes.top-link.me/';
    if (process.env.NODE_ENV === 'production') { // 生产环境用不同的接口地址
      global.linkUrl = 'http://dev.mes.top-link.me/';
    }
    global.isDemo_dev=false;
    // 系统一二级菜单
    global.nav = [
      {
        name: '系统主页',
        icon: 'home',
        key: '/home',
        url: '/home',
      },
      {
        name: '车间监控',
        icon: 'desktop',
        url: '',
        key: '/scada/punch',
      },
      {
        name: '索特车间监控',
        icon: 'desktop',
        url: '',
        key: '/scada/soot',
      },
      {
        name: '系统设置',
        icon: 'setting',
        url: '',
        key: 'TSystemSetting',
        children: [
          {
            name:'角色管理', key: '/setting/role',url:'/setting/role',
          },
          {
            name:'用户列表', key: '/setting/user_list',url:'/setting/user_list',
          },
          /* {
            name:'权限列表', key: '/setting/auth_list',url:'/setting/auth_list',
          }, */
          {
            name:'权限组', key: '/setting/auth_group_list',url:'/setting/auth_group_list',
          },
        ],
      },
    ];
  }(window.gconfig));
})()

export const prefix = global.gconfig.linkUrl
// export const suffix = '.json'
export const suffix = ''

/* {
  "compilerOptions": {
      "experimentalDecorators": true,
      "allowJs": true
  }
} */