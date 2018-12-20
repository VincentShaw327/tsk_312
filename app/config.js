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
        name: '生产管理',
        icon: 'form',
        url: '',
        key: 'manufacture',
        children: [
          {
            name:'订单管理', key: '/production/order',url:'production/order'
          },
          {
            name:'生产任务', key: '/production/task',url:'production/task'
          },
          {
            name:'工单管理', key: '/production/job',url:'/production/job'
          },
          {
            name:'派工单管理', key: '/production/dist',url:'/production/dist'
          },
          {
            name:'投料计划', key: '/production/feeding',url:'/production/feeding'
          },
          /*{
            name:'计划达成率', key: 'planned_completion_rate',url:'planned_completion_rate',
          },*/
        ],
      },
      {
        name: '工艺管理',
        icon: 'fund',
        url: '',
        key: 'TManufactureSetting',
        children: [
          {
            name:'工艺路线', key: '/procession/route',url:'/process/product'
          },
          {
            name:'工艺配置', key: '/procession/configlist',url:'/procession/configlist'
          },
          {
            name:'工作中心', key: '/work/workCenter',url:'/work/workCenter',
          },
          /* {
            name:'库存控制', key: 'task_dispatch',url:'task_dispatch'
          }, */
          /* {
            name:'作业指导书', key: 'task_monitor',url:'task_monitor'
          }, */
          /* {
            name:'开机刷卡记录', key: 'materialReq',url:'materialReq'
          }, */
        ],
      },
      {
        name: '物料管理',
        icon: 'shop',
        url: '',
        key: 'TMtrl',
        children: [
          {
            name:'物料类别', key: '/material/category',url:'/material/category',
          },
          {
            name:'物料型号', key: '/material/item',url:'/material/item',
          },
          {
            name:'产品类别', key: '/product/category',url:'/product/category',
          },
          {
            name:'产品列表', key: '/product/model',url:'/product/model',
          },
          /* {
            name:'BOM表', key: '/material/bom_list',url:'/material/bom_list',
          }, */
        ],
      },
      {
        name: '设备管理',
        icon: 'tablet',
        url: '',
        key: 'TDevice',
        children: [
          {
            name:'设备类别', key: '/device/type',url:'/device/type',
          },
          {
            name:'设备型号', key: '/device/model',url:'/device/model',
          },
          {
            name:'设备品牌', key: '/device/brand',url:'/device/brand',
          },
          {
            name:'设备台账', key: '/device/instance',url:'/device/instance',
          },
          {
            name:'设备维保方案', key: 'dev_maintain_fun',url:'dev_maintain_fun',
          },
          {
            name:'设备保养记录', key: '/device/maintain_his',url:'/device/maintain_his',
          },

          /*{
            name:'设备维保', key: 'TDev_Maintain',url:'',
            children:[
                {
                    name:'维保方案', key: 'TMt_Plan',url:'TMt_Plan',
                },
                {
                    name:'方案绑定', key: 'TPlan_Bind',url:'TPlan_Bind',
                },
                {
                    name:'维保任务', key: 'TMt_Task',url:'TMt_Task',
                },
                {
                    name:'维保分析', key: 'TMt_analysis',url:'TMt_analysis',
                },

            ]
          },*/
        ],
      },
      {
        name: '模具管理',
        icon: 'inbox',
        url: '',
        key: 'TMould',
        children: [
          /* {
            name:'模具架管理', key: '/mould/rack_list',url:'/mould/rack_list',
          }, */
          {
            name:'模具型号', key: '/mould/mould_model',url:'/mould/mould_model',
          },
          {
            name:'模具台帐', key: '/mould/mould_list',url:'/mould/mould_list',
          },
          /*{
            name:'寿命分析', key: 'mould_life',url:'mould_life',
          },*/
        ],
      },
      /* {
        name: '工作中心',
        icon: 'pic-center',
        url: '',
        key: 'TWorkCenter',
        children: [
          {
            name:'工作中心', key: '/work/workCenter',url:'/work/workCenter',
          },
        ],
      }, */
      {
        name: '品质管理',
        icon: 'snippets',
        url: '',
        key: 'TQualityManagement',
        children: [
          {
            name:'品质检验记录', key: '/quality/quality_record',url:'/quality/quality_record',
          },
          /*{
            name:'抽检记录', key: 'crafts',url:'TPM_Procedure',
          },
          {
            name:'末检记录', key: 'TPM_Route',url:'TPM_Route',
          },*/
          /* {
            name:'检验图纸', key: 'TPM_Product',url:'TPM_Product',
          }, */
          {
            name:'品质异常记录', key: 'TPM_Document',url:'TPM_Document',
          }
        ],
      },
      {
        name: '报表中心',
        icon: 'bar-chart',
        url: '',
        key: 'TReport',
        children: [
          {
            name:'设备运行时间统计', key: '/report/dev_run_time',url:'/report/dev_run_time',
          },
          /*{
            name:'计划达成率', key: 'planned_completion_rate',url:'planned_completion_rate',
          },*/
          {
            name:'生产报表', key: '/report/stampingFreq',url:'/report/stampingFreq',
          },
          /*{
            name:'模具冲次统计', key: 'mold_punch_report',url:'mold_punch_report',
          },*/
          {
            name:'停机分析', key: '/report/DowntimeMon',url:'/report/DowntimeMon',
          },
          /*{
            name:'周停机分析', key: 'DowntimeWeek',url:'DowntimeWeek',
          },*/
          {
            name:'OEE', key: '/report/stoee',url:'/report/stoee',
          },
        ],
      },
      {
        name: '原料利用率分析',
        icon: 'area-chart',
        url: '',
        key: 'matrl_consumption',
        children: [
          {
            name:'单日材料利用率', key: '/mtrl_loss/material_loss_collate',url:'/mtrl_loss/material_loss_collate',
          },
          {
            name:'材料利用率分析', key: '/mtrl_loss/material_loss_tend',url:'/mtrl_loss/material_loss_tend',
          },
          {
            name:'材料利用率同比分析', key: '/mtrl_loss/material_loss_mon',url:'/mtrl_loss/material_loss_mon',
          },
          {
            name:'材料利用率周期汇总', key: '/mtrl_loss/material_loss_week',url:'/mtrl_loss/material_loss_week',
          },
        ],
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