import store from '../store'
import {setIsLogin,setUserInfo} from './cache'

export default {
  install (Vue, options) {
    /**
     * 公用请求方法 以params形式提交参数
     * @param type
     * @param url
     * @param params
     * @param urlId
     * @returns {Promise<any>}
     */
    Vue.prototype.requestAjax = function (type, url, params, urlId) {
      // 分页开始
      let newParams = {}
      Object.assign(newParams, params)
      // 添加rr时间戳参数值清除缓存用
      if (type != 'post' && type != 'POST') {
        newParams.rr = parseInt(new Date().getTime())
      }
      // 分页计算开始
      if (newParams.offset && newParams.offset > 0) {
        newParams.offset = parseInt(newParams.offset - 1) * newParams.limit
      }
      // 分页计算结束
      return new Promise((resolve, reject) => {
        this.axios({
          method: type,
          url: this.getWbkUrl(url, urlId),
          params: newParams,
          xhrFields: {
            withCredentials: true
          }
        }).then((data) => {
          if (this.isOvertime(data.data)) {
             resolve(data.data)
          }
        }).catch((error) => {
          console.log('error...')
          reject(error)
        })
      })
    }
    /**
     * 公用请求方法以data方式提交参数
     * @param type
     * @param url
     * @param data
     * @param urlId
     * @returns {Promise<any>}
     */
    Vue.prototype.requestFile = function (type, url, data, urlId) {
      return new Promise((resolve, reject) => {
        this.axios({
          method: type,
          url: this.getWbkUrl(url, urlId),
          data: data,
          withCredentials: true
        }).then((data) => {
          if (this.isOvertime(data.data)) {
            resolve(data.data)
          }
        }).catch((error) => {
          console.log('error...')
          reject(error)
        })
      })
    }
    /**
     * 超出部分隐藏
     * @param h
     * @param params
     * @returns {*}
     */
    Vue.prototype.tdRender = function (h, params) {
      return h('div', {
        'class': 'td-render',
        domProps: {
          title: params.row[params.column.key]
        },
        style: {
          cursor: 'pointer'
        }
      }, params.row[params.column.key])
    }
    /**
     * 创建用户渠道转义
     * @param number
     * @returns {string}
     */
    Vue.prototype.getActiveStatus = function (number) {
      /*    【-1：审核不通过】【0：未审核】【1：未开始】【2：执行中】【3：暂停】【99：结束】*/
      switch ('' + number) {
        case '-1':
          return '审核未通过'
        case '0':
          return '待审核'
        case '1':
          return '未开始'
        case '2':
          return '进行中'
        case '3':
          return '已取消'
        case '99':
          return '结束'
        default:
          return number
      }
    }
    /**
     * 获取用户角色名称
     * @param role
     * @returns {*}
     */
    Vue.prototype.getRole = function (role) {
      switch ('' + role) {
        case '0':
          return '普通用户'
        case '1':
          return '活动管理员'
        case '98':
          return '运营管理员'
        case '99':
          return '平台管理员'
        default:
          return role
      }
    }
    /**
     * 转义状态
     * @param number
     * @returns {string}
     */
    Vue.prototype.getUserChannel = function (number) {
      switch ('' + number) {
        case '0':
          return '人工创建'
        case '1':
          return 'EXCEL导入'
        case '2':
          return '微信生成'
        case '3':
          return '邀请生成'
        default:
          return number
      }
    }
    /**
     * 转义订单状态
     * @param number
     * @returns {string}
     */
    Vue.prototype.formatterOrders = function (number) {
      switch ('' + number) {
        case '0':
          return '待支付'
        case '1':
          return '支付成功'
        case '2':
          return '已取消'
        case '3':
          return '支付成功'
        default:
          return number
      }
    }
    /**
     * 转义订单状态
     * @param number
     * @returns {string}
     */
    Vue.prototype.formatterBalancelogStatus = function (number) {
      //0到账；1待审批；2审批通过；3审批不通过
      switch ('' + number) {
        case '0':
          return '已到账'
        case '1':
          return '待审批'
        case '2':
          return '待支付'
        case '3':
          return '审批未通过'
        default:
          return number
      }
    }
    /**
     * 设置定时器
     * @param func
     * @param delay
     * @returns {Function}
     */
    Vue.prototype.debounce = function (func, delay) {
      let timer
      return function (...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
    /**
     * 公用页面跳转
     * @param url
     */
    Vue.prototype.routePush = function (url, id, type, obj) {
      let newParams = {}
      if (obj) {
        Object.assign(newParams, obj)
      }
      if (id) {
        Object.assign(newParams, {id: id})
      }
      if (type) {
        Object.assign(newParams, {type: type})
      }
      this.$router.push({path: url, query: newParams})
    }
    /**
     * 验证非空
     * @param val
     * @returns {boolean}
     */
    Vue.prototype.isEmpty = function (val) {
      if (val === null) return true
      if (val === undefined || val === 'undefined') return true
      if (val === '') return true
      if (val.length === 0) return true
      if (!/[^(^\s*)|(\s*$)]/.test(val)) return true
      return false
    }
    /**
     * 验证非空
     * @param params
     * @param verification
     * @returns {boolean}
     */
    Vue.prototype.verification = function (params, verification) {
      let mark = true
      for (let key in verification) {
        if (this.isEmpty(params[key])) {
          mark = false
          this.$Message.error(verification[key].msg)
          break
        }
      }
      return mark
    }
    /**
     * 转义时间
     * @param time
     * @returns {*}
     */
    Vue.prototype.formatterTime = function (time) {
      if (time === undefined || time === null || time === '') {
        return ''
      }
      return Date.formatByTimes(time.getTime(), 'yyyy-MM-dd hh:mm:ss')
    }
    /**
     * 转义时间戳
     * @param time
     * @returns {*}
     */
    Vue.prototype.formatterObjTime = function (time, type) {
      if (time === undefined || time === null || time === '') {
        return ''
      }
      return Date.formatByTimes(time.time, type || 'yyyy-MM-dd hh:mm')
    }
    /**
     * 比较时间大小
     * @param bTime
     * @param eTime
     * @returns {*}
     */
    Vue.prototype.compareTime = function (bTime, eTime) {
      if (bTime && bTime) {
        let _bTime = bTime.replace(/-/g, '/')
        let _eTime = eTime.replace(/-/g, '/')
        if (new Date(_bTime).getTime() >= new Date(_eTime).getTime()) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
    /**
     * 验证图片格式大小
     * @param file
     * @returns {*}
     */
    Vue.prototype.testImg = function (file) {
      const maxSize = 1024 * 1000 * 4 // 2M
      /*      const imgWith = 1080
            const imgHeight = 640*/
      let arr = file.name.split('.')
      if (['bmp', 'jpg', 'jpeg', 'png', 'gif'].indexOf(arr[arr.length - 1]) === -1) {
        this.$Message.error(file.name + '不是图片，不能导入')
        return false
      }
      if (file.size > maxSize) {
        this.$Message.error('图片大小不能超过4M')
        return false
      }
      let path
      /*    let img = new Image()*/
      if (document.all) {
        file.select()
        path = document.selection.createRange().text
      } else {
        path = window.URL.createObjectURL(file) // FF 7.0以上
      }
      /*   img.src = path
         console.log(img)
         console.log(img.width, img.height)*/
      /*     if (img.width !== imgWith || img.height !== imgHeight) {
             this.$Message.error('图片规格必须为1080 * 640')
             return false
           }*/
      return path
    }
    /**
     * 比较时间大小
     * @param time
     * @param nowTime
     * @returns {string}
     */
    Vue.prototype.formatterTimeCompare = function (bTime, eTime) {
      let _bTime = new Date(bTime.replace(/-/g, '/'))
      let _eTime = new Date(eTime.replace(/-/g, '/'))
      if (_bTime.getTime() <= _eTime.getTime()) {
        return '<='
      } else {
        return '>'
      }
    }
    /**
     * 登入超时验证
     * @param data
     * @returns {boolean}
     */
    Vue.prototype.isOvertime = function (data) {
      if (data.data && data.data.TimeOut) {
        store.state.isLogin = false
        setIsLogin(false)
        store.state.userData = null
        setUserInfo(null)
        this.$Message.warning({content: '登录超时, 请重新登录！', duration: 10, closable: true})
        this.routePush('/login', '', '', {oldPath: this.$route.path})
        return false
      } else {
        return true
      }
    }
    /**
     * 强制保留两位小数
     * @param x
     * @returns {*}
     */
    Vue.prototype.toDecimal2 = function (x) {
      if (isNaN(+x)) {return '0.00'}
      let num = Math.round(x*100)/100
      let s = num.toString()
      let rs = s.indexOf('.')
        if (rs < 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + 2) {
          s += '0'
        }
        return s
    }
  }
}
