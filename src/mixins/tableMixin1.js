export const tableMixin = {
  data() {
    return {
      changeColumns: [],
      rowsData: [],        // 表格数据
      total: 0,            // 表格总条数
      loading: '',        // 加载中

      data: [],
      keyWord: '',
      selectRows: [],
      params: {
        keyWord: '',
        limit: 20,
        offset: 1
      },

      clickType: '', // 判断删改
      inputForm: {
        show: false,
        modalDisabled: false,
        modalshow: false,
        option: {},
        value: {}
      }, // 表单参数

      propsList: [],       // 自定义字段
      propsOpintions: [],  // 自定义字段配置
      propsFromVal: {},    // 自定义字段值


    }
  },
  methods: {
    requestProps() {
      this.requestAjax('get', 'props', {model: this.propsKey}).then(res => {
        if (res.success) {
          this.propsList = res.data.rows
          this._parseCustomProps(res.data.rows)
          // this.columns = this.columns.concat(this._parseCustomProps(res.data.rows))
          this.propsOpintions.push(this.addPropsInputs(this.propsList))
          this.propsFromVal = this.addPropsIds(this.propsList)
        }
      })
    },
    addPropsInputs(data) {
      let input = []
      data.forEach(item => {
        input.push({
          title: '#' + item.nameCn,
          id: item.nameEn,
          type: 'input',
          titlespan: 3,
          colspan: 9,
          required: false
        })
      })
      if (input.length > 0) input.unshift({title: '自定义字段', theme: true})
      return input
    },
    addPropsIds(data) {
      let ids = {}
      data.forEach(item => {
        ids[item.nameEn] = ''
      })
      return ids
    },
    _clearPropsFromVal() {
      for (let k in this.propsFromVal) {
        this.propsFromVal[k] = ''
      }
    },
    _setPropsVal(data) {
      for (let k in data) {
        this.propsFromVal[k] = data[k]
      }
    },
    _parseCustomProps(data) {
      let arr = []
      data.forEach(item => {
        this.columns.splice(this.columns.length - 1, 0, {
          title: '#' + item.nameCn, show: false, key: item.nameEn, width: 150, sortable: true, render: (h, params) => {
            let propsVal = null
            if (params.row.propsVal) {
              propsVal = JSON.parse(params.row.propsVal)
            }
            return h('div', [
              h('span', propsVal ? propsVal[item.nameEn] : '')
            ])
          }
        })
      })
      return arr
    },

    columnsChange(val) {
      for (let key in this.columns) {
        this.columns[key].show = false
      }
      this.changeColumns = []
      for (let key of val) {
        this.columns[key].show = true
        this.changeColumns.push(Object.assign({}, this.columns[key]))
      }
      console.log(this.changeColumns)
    },

    // table统一加载方法
    /**
     *加载table数据
     */
    loadTable () {
      this.loading = '数据加载中...请稍等！'
      this.requestAjax('GET', this.table.url, this.params).then((data) => {
        if (data.success) {
          this.total = !isNaN(+data.data.total) ? +data.data.total : 0
          this.loading = '暂无数据'
          this.data = data.data.rows
        } else {
          this.loading = '暂无数据'
          this.data = []
        }
      },()=>{
        this.loading = '网络错误，加载失败'
        this.data = []
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
    },
    /**
     * 监听事件table选中事件
     */
    selectTable (val) {
      this.selectRows = val
    },

    /**
     * 删除前提示
     * @param row
     */
    _confirmDelete (id) {
      this.$Modal.confirm({
        title: '提示信息',
        content: '是否确认删除操作？',
        onOk: () => {
          this._deleteUserInfo(id)
        },
        onCancel: () => {

        }
      })
    },
    /**
     * 删除功能
     * @param row
     */
    _deleteUserInfo (id) {
      this.requestAjax('DELETE',this.table.deleteUrl, {}, id).then((data) => {
        if (data.success) {
          this.$Message.success('删除成功')
          this.loadTable()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    /**
     * 提交表单
     * @param obj
     */
    submitAjax (obj,url,msg) {
      this.requestAjax('post', url, obj).then((data) => {
        if (data.success) {
          this.$Message.success(msg+ '成功')
          this.inputForm.modalshow = false
          this.loadTable()
        } else {
            this.$Message.success(msg + '失败')
        }
        this.inputForm.modalDisabled = false
      }, (err) => {
        this.$Message.success(msg + '失败')
        this.inputForm.modalDisabled = false
      })
    }
  }

}
