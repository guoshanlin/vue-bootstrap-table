<template>
  <div>
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
