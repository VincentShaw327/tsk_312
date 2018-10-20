export default (() => {
  window.gconfig = {};
  +(function (global) {
    // 本地开发打开的路径以及端口
    global.linkUrl = 'http://localhost:3001';
    if (process.env.NODE_ENV === 'production') { // 生产环境用不同的接口地址
      global.linkUrl = 'http://localhost:3000';
    }
    global.isDemo_dev=true;
    // 系统一二级菜单
    global.nav = [
      {
        name: '系统主页',
        icon: 'home',
        url: 'THome',
        key: 'THome',
      },
      {
        name: '车间监控',
        icon: 'desktop',
        url: '',
        key: 'scada',
      },
      {
        name: '生产管理',
        icon: 'form',
        url: '',
        key: 'TManufacture',
        children: [
          {
            name:'订单排程', key: 'manufacture_task',url:'manufacture_task'
          },
          {
            name:'生产派工', key: 'task_dispatch',url:'task_dispatch'
          },
          {
            name:'工单监控', key: 'task_monitor',url:'task_monitor'
          },
          {
            name:'投料计划', key: 'consumPlan',url:'consumPlan'
          },
          {
            name:'计划达成率', key: 'planned_completion_rate',url:'planned_completion_rate',
          },
        ],
      },
      {
        name: '生产控制',
        icon: 'fund',
        url: '',
        key: 'TManufactureSetting',
        children: [
          {
            name:'工艺控制', key: 'manufacture_task',url:'manufacture_task'
          },
          /* {
            name:'库存控制', key: 'task_dispatch',url:'task_dispatch'
          }, */
          {
            name:'工艺指导书', key: 'task_monitor',url:'task_monitor'
          },
          {
            name:'开机刷卡记录', key: 'materialReq',url:'materialReq'
          },
        ],
      },
      {
        name: '品质管理',
        icon: 'snippets',
        url: '',
        key: 'TQualityManagement',
        children: [
          {
            name:'首检记录', key: 'process',url:'pm_management',
          },
          {
            name:'抽检记录', key: 'crafts',url:'TPM_Procedure',
          },
          {
            name:'末检记录', key: 'TPM_Route',url:'TPM_Route',
          },
          {
            name:'检验图纸', key: 'TPM_Product',url:'TPM_Product',
          },
          {
            name:'品质异常记录', key: 'TPM_Document',url:'TPM_Document',
          }
        ],
      },
      {
        name: '设备管理',
        icon: 'tablet',
        url: '',
        key: 'TDevice',
        children: [
          /*{
            name:'设备类别', key: 'TDeviceCategory',url:'TDeviceCategory',
          },*/
          {
            name:'设备型号', key: 'TDeviceModel',url:'TDeviceModel',
          },
          {
            name:'设备台账', key: 'TDeviceList',url:'TDeviceList',
          },
          {
            name:'设备保养记录', key: 'dev_maintain',url:'dev_maintain',
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
          {
            name:'模具型号', key: 'mould_model',url:'mould_model',
          },
          {
            name:'模具列表', key: 'mould_list',url:'mould_list',
          },
          /*{
            name:'寿命分析', key: 'mould_life',url:'mould_life',
          },*/
        ],
      },
      {
        name: '物料管理',
        icon: 'shop',
        url: '',
        key: 'TMtrl',
        children: [
          {
            name:'物料型号', key: 'material_model',url:'mtrl_model',
          },
          {
            name:'产品型号', key: 'product_model',url:'product_list',
          },
          {
            name:'BOM表', key: 'bom_list',url:'bom_list',
          },
        ],
      },
      {
        name: '工作中心',
        icon: 'pic-center',
        url: '',
        key: 'TWorkCenter',
        children: [
          {
            name:'工作中心类型', key: 'workCenter_type',url:'workCenter_type',
          },
          {
            name:'工作中心', key: 'workCenter',url:'workCenter',
          },
        ],
      },
      {
        name: '报表中心',
        icon: 'bar-chart',
        url: '',
        key: 'TReport',
        children: [
          {
            name:'设备运行时间统计', key: 'dev_run_time',url:'dev_run_time',
          },
          /*{
            name:'计划达成率', key: 'planned_completion_rate',url:'planned_completion_rate',
          },*/
          {
            name:'生产报表', key: 'stampingFreq',url:'stampingFreq',
          },
          /*{
            name:'模具冲次统计', key: 'mold_punch_report',url:'mold_punch_report',
          },*/
          {
            name:'停机分析', key: 'DowntimeMon',url:'DowntimeMon',
          },
          /*{
            name:'周停机分析', key: 'DowntimeWeek',url:'DowntimeWeek',
          },*/
          {
            name:'时间稼动率', key: 'stoee',url:'oee_analysis_report',
          },
        ],
      },
      {
        name: '原料耗损分析',
        icon: 'area-chart',
        url: '',
        key: 'matrl_consumption',
        children: [
          {
            name:'产品材料损耗分析', key: 'material_loss_collate',url:'material_loss_collate',
          },
          {
            name:'产品材料耗损趋势', key: 'material_loss_tend',url:'material_loss_tend',
          },
          {
            name:'月度材料耗损', key: 'material_loss_mon',url:'material_loss_mon',
          },
          {
            name:'一周材料耗损', key: 'material_loss_week',url:'material_loss_week',
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
            name:'用户列表', key: 'user_list',url:'user_list',
          },
          {
            name:'权限列表', key: 'auth_list',url:'auth_list',
          },
          {
            name:'权限组', key: 'auth_group_list',url:'auth_group_list',
          },
        ],
      },
    ];
  }(window.gconfig));
})()

export const prefix = global.gconfig.linkUrl
export const suffix = '.json'
