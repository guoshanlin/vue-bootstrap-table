export default {
  install (Vue, options) {
    const preuUrl = '/qj/mice/'
    const preuUrl2 = '/mp/'
    /**
     * 公用请求接口统一管理方法
     * @param key
     */
    const requestUrl = {
      // 菜单管理
      baseMenus: {url: 'base_menus', pre: preuUrl},
    }
    /**
     * 获取url
     * @param key
     * @param id
     */
    Vue.prototype.getWbkUrl = function (key, id) {
      if (id && id !== undefined) {
        return requestUrl[key].pre + requestUrl[key].url.replace('{id}', id)
        // return requestUrl[key].url.replace('{id}', id)
      } else {
        return requestUrl[key].pre + requestUrl[key].url
        // return requestUrl[key].url
      }
    }
  }
}
