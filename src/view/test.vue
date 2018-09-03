<template>
  <div>
    <!--<h3>这是一个table测试</h3>-->
    <!--<div style="padding: 20px">-->
    <!--<table id="table"></table>-->
    <!--</div>-->
    <div id="topToolBar">
      <i-button type="primary" @click="refresh">普通刷新</i-button>
      <i-button @click="refreshOptions">初始刷新</i-button>
    </div>
    <div>
      <i-bootstrap-table :options="options" @change="tableChange" ref="table"></i-bootstrap-table>
    </div>
  </div>
</template>

<script>
  import {tableMixin} from 'mixins/tableMixin'
  import iBootstrapTable from 'components/bootstrap-table'

  export default {
    mixins: [tableMixin],
    name: 'HelloWorld',
    data() {
      return {
        msg: '这是一个测试页面',
        options: {
          id: 'tableTest',
          url: 'baseMenus',
          params: {
            sort: 'priority'
          },
          columns: [
            { field: 'ck', checkbox: true, align: 'center', valign: 'middle'},
            {
              field: 'priority',
              title: '优先级',
              align: 'left'
            },
            {
              field: 'name',
              title: '名称',
              align: 'left'
            },
            {
              field: 'url',
              title: '路径',
              align: 'left'
            },
            {
              field: 'icon',
              title: '图标',
              align: 'left'
            },
            {
              field: 'status',
              title: '状态',
              align: 'left',
              formatter: (v, r, i) => {
                return v == 0 ? '不可用': '可用'
              }
            },
            {
              field: '',
              title: '操作',
              width: 100,
              align: 'center',
              formatter: (v, r, i) => {
                return '<button type="button" class="ivu-btn ivu-btn-primary  ivu-btn-small ivu-btn-icon-only" title="修改"><i class="ivu-icon ivu-icon-md-create"></i></button>' +
                  '<button type="button" class="ivu-btn ivu-btn-warning  ivu-btn-small ivu-btn-icon-only" style="margin-left: 5px;" title="修改"><i class="ivu-icon ivu-icon-md-close"></i></button>'
              }
            },
          ],
          tableToolbar: '#topToolBar'
        }
      }
    },
    components: {
      iBootstrapTable
    },
    methods: {
      initTable() {
        $('#table').bootstrapTable({
          // url: wbkUrl.getUrl("history"),
          //  url:"http://myEvent.cn",
          // method: 'get',
          // contentType: "application/x-www-form-urlencoded",//必须的
          striped: true,
          pagination: true,
          singleSelect: false,
          // sortOrder: "desc",
          // sortName:"lastOccurrence",
          showRefresh: true,
          clickToSelect: false,
          showToggle: false,
          // pageSize: 20,
          // pageNumber: 1,
          // pageList: [10,20,50],
          search: false, //不显示 搜索框
          showColumns: true, //不显示下拉框（选择显示的列）
          sidePagination: "server", //服务端请求
          toolbar: "#tableToolbar",
          // height: allEvents.getTableHeight(),
          queryParams: function (params) {
            // return $.extend(utils.cleanCacheParam(), params, _params);
          },
          responseHandler: function (res) {
          },//单击选中事件以及单击＋shift选中事件
          onClickRow: function (row, $element, field) {
          },
          onDblClickRow: function (row, $element, field) {
          },
          onLoadSuccess: function (data) {
          },
          onPostBody: function () {
          },
          onCheck: function (row) {
          },
          onUncheck: function (row) {
          },
          onUncheckAll: function (row) {
          },
          onCheckAll: function (row) {
          },
          onColumnSwitch: function (field, checked) {
          },
          columns: [{
            field: 'id',
            title: 'Item ID',
            align: 'left'
          }, {
            field: 'name',
            title: 'Item Name',
            align: 'left'
          }, {
            field: 'price',
            title: 'Item Price',
            align: 'left'
          },
            {
              field: 'id1',
              title: 'Item ID1',
              align: 'left'
            }, {
              field: 'name1',
              title: 'Item Name1',
              align: 'left'
            }, {
              field: 'price1',
              title: 'Item Price1',
              align: 'left'
            }
          ],
          data: [{
            id: 1,
            name: 'Item 1',
            price: '$1',
            id1: 1,
            name1: 'Item 1',
            price1: '$1'
          }, {
            id: 2,
            name: 'Item 2',
            price: '$2',
            id1: 2,
            name1: 'Item 2',
            price1: '$2'
          }, {
            id: 3,
            name: 'Item 3',
            price: '$3',
            id1: 3,
            name1: 'Item3',
            price1: '$3'
          }]
        });
      },
      onDblClickRow(row, $element, field) {
        console.log('++++++++++++++++++++++onDblClickRow')
        console.log(row, $element, field)
      },
      onClickRow(row, $element, field) {
        console.log('======================onClickRow')
        console.log(row, $element, field)
      },
      onCheck(row) {console.log('===============onCheck',row)},
      onUncheck(row) {console.log('===============onUncheck',row)},
      onUncheckAll(row) {console.log('===============onUncheckAll',row)},
      onCheckAll(row) {console.log('===============onCheckAll',row)},
      refresh() {
        this.$refs.table.refresh()
      },
      refreshOptions() {
        this.$refs.table.refreshOptions()
      }
    },
    mounted() {
      this.$nextTick(() => {
        // this.initTable()
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
