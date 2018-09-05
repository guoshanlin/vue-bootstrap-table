
export const columnsMixin = {
  data(){
    return {
      changeColumns: [],
      total: 0,
      keyWord: '',
      loading: '',
      data: [],
      params: {
        keyWord: '',
        limit: 20,
        offset: 1
      }
    }
  },
  methods: {
    columnsChange (val) {
      for (let key in this.columns) {
        this.columns[key].show = false
      }
      this.changeColumns = []
      for (let key of val) {
        this.columns[key].show = true
        this.changeColumns.push(Object.assign({}, this.columns[key]))
      }
    },
    /**
     *加载table数据
     */
    loadTable () {
      this.loading = '数据加载中...请稍等！'
      this.requestAjax('GET', this.url, this.params).then((data) => {
        if (data.success) {
          this.total = !isNaN(+data.data.total) ? +data.data.total : 0
          this.loading = '暂无数据'
          this.data = data.data.rows
        } else {
          this.loading = '暂无数据'
          this.data = []
        }
      })
    },
    /**
     *跳页
     * @param v
     */
    changePage (v) {
      this.params.offset = v
      this.loadTable()
    },
    /**
     *改变页面展示用户条数
     * @param v
     */
    changeSize (v) {
      this.params.limit = v
      this.loadTable()
    },
    /**
     *排序
     * @param obj
     */
    sortChange (obj) {
      this.params.sort = obj.key
      this.params.order = obj.order
      this.loadTable()
    },
    /**
     * 模糊查询
     *
     */
    searchDriver () {
      this.params.keyWord = this.keyWord
      this.params.limit = 20
      this.params.offset = 1
      this.loadTable()
    }
  }
}
