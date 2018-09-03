<template>
  <div>
    <table :id="id"></table>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        id: this.options.id, //table id
        url: this.options.url, //table 请求url
        params: this.options.params, //table 请求参数url
        columns: this.options.columns, //table 列参数
        tableToolbar: this.options.tableToolbar //table tableToolbar的id
      }
    },
    props: {
      options: {
        id: '',
        url: '',
        params: '',
        columns: '',
        tableToolbar: ''
      }
    },
    watch: {
      options(obj) {
        this.id = obj.id, //table id
        this.url = obj.url, //table 请求url
        this.params = obj.params, //table 请求参数url
        this.columns = obj.columns, //table 列参数
        this.tableToolbar = obj.tableToolbar //table tableToolbar的id
      }
    },
    beforeCreate() {
      this.$nextTick(() => {
        this.initTable()
      })
    }, // 数据加载前触发
    methods: {
      initTable() {
        let _this = this
        $('#' + this.id).bootstrapTable({
          url:this.getWbkUrl(this.url),
          method: 'get',
          contentType: "application/x-www-form-urlencoded",//必须的
          striped: true,
          pagination: true,
          singleSelect: false,
          sortOrder: "asc",
          sortName:this.params.sort,
          showRefresh: true,
          clickToSelect: false,
          showToggle: false,
          pageSize: 10,
          pageNumber: 1,
          pageList: [10,20,50],
          search: false, //不显示 搜索框
          showColumns: true, //不显示下拉框（选择显示的列）
          sidePagination: "server", //服务端请求
          toolbar: this.tableToolbar,
          // height: allEvents.getTableHeight(),
          columns: this.columns,
          queryParams: function (params) {
            return $.extend({rr: parseInt(new Date().getTime())},params,this.params)
          },
          responseHandler: function (res) {
            if(res.success){
              return res.data;
            }
            return []
          },
          onClickRow: function (row, $element, field) {
            _this.$emit('change','onClickRow', {row: row, event:$element, field: field })
          },
          onDblClickRow: function (row, $element, field) {
            _this.$emit('change','onDblClickRow', {row: row, event:$element, field: field })
          },
          onLoadSuccess: function (data) {
            _this.$emit('change','onLoadSuccess', {data: data})
          },
          onCheck: function (row) {
            _this.$emit('change','onCheck', {row: row})
          },
          onUncheck: function (row) {
            _this.$emit('change','onUncheck', {row: row})
          },
          onUncheckAll: function (row) {
            _this.$emit('change','onUncheckAll', {row: row})
          },
          onCheckAll: function (row) {
            _this.$emit('change','onCheckAll', {row: row})
          },
          onColumnSwitch: function (field, checked) {
            _this.$emit('change','onColumnSwitch', {field: field,checked: checked})
          }
        })
      },
      refreshOptions () {
        $("#" + this.id).bootstrapTable("refreshOptions",{pageNumber:1})
      },
      refresh() {
        $("#" + this.id).bootstrapTable("refresh")
      }
    }
  }
</script>

<style scoped>

</style>
