export default {
  install (Vue, options) {
    const preuUrl = ''
    /**
     * 公用请求接口统一管理方法
     * @param key
     */
    const requestUrl = {
      // 登录
      login: {url: 'members/login', pre: preuUrl},
      // 退出登录
      logout: {url: 'members/logout', pre: preuUrl},
      // get查询用户 post添加或修改用户用信息
      members: {url: 'members', pre: preuUrl},
      // 删除用户
      deleteMembers: {url: 'members/{id}', pre: preuUrl},
      // 上传文件
      upload: {url: 'files/upload', pre: preuUrl},
      // 上传成员附件
      uploadNumber: {url: 'members/upload', pre: preuUrl},
      // 查询添加活动
      activitys: {url: 'activitys', pre: preuUrl},
      // 下载会员导入木本
      filesDown: {url: 'files/down', pre: preuUrl},
      // 查询票券信息
      ticket: {url: 'ticket', pre: preuUrl},
      // 查询活动信息
      report: {url: 'activitys/report', pre: preuUrl},
      // 订单信息
      orders: {url: 'orders', pre: preuUrl},
      // 会员信息
      vips: {url: 'vips', pre: preuUrl},
      // 导入会员信息
      vipsUpload: {url: 'vips/upload', pre: preuUrl},
      // 删除查询会员信息
      vipsId: {url: 'vips/{id}', pre: preuUrl},
      // 修改用户密码
      updatePwd: {url: 'members/updatePwd', pre: preuUrl},
      // 获取会员余额
      balanceLog: {url: 'balanceLog/{id}', pre: preuUrl},
      // 获取会员余额
      balance: {url: 'balanceLog', pre: preuUrl},
      // 申请提现
      createWithdrawOrder: {url: 'balanceLog/createWithdrawOrder', pre: preuUrl},
      // 申请提现
      examination: {url: 'balanceLog/examination', pre: preuUrl},
      // 签到统计
      reportSign: {url: 'activitys/reportSign', pre: preuUrl},
      // 报名统计
      reportEntered: {url: 'activitys/reportEntered', pre: preuUrl},
      // 活动报名表
      reportEnteredDateInfo: {url: 'activitys/reportEnteredDateInfo', pre: preuUrl},
      // 活动报名订单统计
      reportOrderInfo: {url: 'activitys/reportOrderInfo', pre: preuUrl},
      // 按时间统计流量
      queryAccessCt: {url: 'accessLog/queryAccessCt', pre: preuUrl},
      // 时间统计流量-统计每分钟流量
      queryAccessCtByMinList: {url: 'accessLog/queryAccessCtByMinList', pre: preuUrl},
      ctByFormat: {url: 'accessLog/ctByFormat', pre: preuUrl},
      // 时间统计流量-统计每个url流量
      queryAccessCtByUrlList: {url: 'accessLog/queryAccessCtByUrlList', pre: preuUrl},
      // 按类型统计流量
      queryAccessCtByType: {url: 'accessLog/queryAccessCtByType', pre: preuUrl},
      // 查询活动分来
      activitysConfig: {url: 'activitys/config', pre: preuUrl},
      // 查询活动分来
      findTree: {url: 'configs/findTree', pre: preuUrl},
      // 查询最热活动
      activityTopN: {url: 'accessLog/activityTopN', pre: preuUrl},
      // 查询活动详情
      activitysInfo: {url: 'activitys/info/{id}', pre: preuUrl},
      // 查询活动详情
      queryMemberBalance: {url: 'balanceLog/queryMemberBalance', pre: preuUrl},
      // 微信登录
      loginWx: {url: 'members/loginWx', pre: preuUrl}
    }
    /**
     * 获取url
     * @param key
     * @param id
     */
    Vue.prototype.getWbkUrl = function (key, id) {
      if (id && id !== undefined) {
        /*   return requestUrl[key].pre + requestUrl[key].url.replace('{id}', id)*/
        return requestUrl[key].url.replace('{id}', id)
      } else {
        // return requestUrl[key].pre + requestUrl[key].url
        return requestUrl[key].url
      }
    }
  }
}
