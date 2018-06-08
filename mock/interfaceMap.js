const tableList = require('./datas/tableList')
const mt_planlist = require('./datas/mt_planlist')

const prefix = '.json'

module.exports = {
  // [`/tableList${prefix}`]: tableList,
  [`/tableList`]: tableList,
  [`/mt_planlist`]: mt_planlist,
}
