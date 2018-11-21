<template>
  <div class="wrapper b wrapper-box">
    <Row type="flex" :gutter=5 class="m-b10">
      <!--<列表导栏>-->
      <i-col span="12">
        <Row type="flex" justify="start">
          <i-col>
            <Button type="primary" @click="addOrModify">新增</Button>
          </i-col>
        </Row>

      </i-col>
      <i-col span="12">
        <Row type="flex" justify="end">
          <i-col>
            <i-input class="width-letf" placeholder="关键字" v-model="keyWord"></i-input>
          </i-col>
          <i-col>
            <Button type="primary"  class="m-r15 m-l5" icon="ios-search" @click="searchDriver">搜索</Button>
          </i-col>
          <i-col>
            <table-columns :columns="columns" @change="columnsChange" @refresh="loadTable"></table-columns>
          </i-col>
        </Row>
      </i-col>
    </Row>
    <i-table class="table-dray" :columns="changeColumns" :data="data" border size="small" ref="table"  :no-data-text="loading" @on-sort-change="sortChange" @on-selection-change="selectTable"></i-table>
    <div style="text-align: right; padding-top: 5px;">
      <Page show-total show-sizer show-elevator style="display: inline-block;" placement="top"
            :total="total"
            :page-size="params.limit"
            :current="params.offset"
            @on-change="changePage"
            @on-page-size-change="changeSize"></Page>
    </div>
    <!--新增表单承载标签-->
    <input-from v-if="inputForm.show" @changeOptions="getInputVal" :options="inputForm.option" :value="inputForm.value" :modalDisabled="inputForm.modalDisabled"
                :modalshow="inputForm.modalshow"/>
  </div>
</template>
<script>
  import tableColumns from 'components/table-columns'
  import inputFrom from 'components/model/inputFrom.vue'
  import {mapGetters} from 'vuex'
  import { tableMixin } from 'mixins/tableMixin'
  import { drayTableMixin } from 'mixins/drayTableMixin'

  export default {
    mixins: [tableMixin,drayTableMixin],
    destroyed () {
      window.onresize = function () {}
    },
    data () {
      return {
        columns: [
          {title: '序号', minWidth: 140, key: 'name',show: true, sortable: true, render: this.tdRender,renderHeader: this.drayHeaderRender},
          {title: '名称', minWidth: 140, key: 'name',show: true, sortable: true, render: this.tdRender,renderHeader: this.drayHeaderRender},
          {title: '图标', minWidth: 140, key: 'name', show: true, sortable: true, render: this.tdRender,renderHeader: this.drayHeaderRender},
          {title: '链接', minWidth: 140, key: 'url',show: true, sortable: true, render: this.tdRender,renderHeader: this.drayHeaderRender},
          {title: '备注', minWidth: 200, key: 'name', show: true, sortable: true, render: this.tdRender,renderHeader: this.drayHeaderRender},
          {
            title: '操作',
            align: 'center',
            show: true,
            width: 140,
            render: (h, params) => {
              return h('div',
                [
                  h('Button', {
                    style: {marginRight: '5px'},
                    props: {type: 'primary', size: 'small'},
                    nativeOn: {
                      click: () => {
                        this.addOrModify(params.row, '修改')
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    style: {marginRight: '5px'},
                    props: {type: 'warning', size: 'small'},
                    nativeOn: {
                      click: () => { // warning
                        this._confirmDelete(params.row.id)
                      }
                    }
                  }, '删除')
                ])
            }
          }
        ],
        table: {
          url: 'config', //table查询时的url
          deleteUrl: 'deleteConfig' //删除table某一列url
        }
      }
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    components: {
      inputFrom,
      tableColumns
    },
    methods: {
      /**
       *新增或修改用户
       */
      addOrModify (row, type) {
        let _b = false
        if (type === '修改') {
          this.clickType = '修改'
          _b = true
        } else {
          this.clickType = '新增'
        }
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.option = {
          title: _b ? '修改分类' : '新增分类',
          width: '520',
          opintions: [
            [
              {title: '名称', id: 'name', type: 'input', titlespan: 4, colspan: 20, required: true},
              {title: '图标', id: 'fileImg', type: 'fileImg',url: 'fileImgUrl',maxSize: 1, btnName: '上传图标',
                tipMsg: '建议图片尺寸64*64,大小不超过 1M', titlespan: 4, colspan: 20, required: true},
              {title: '序号', id: 'sortName', type: 'input', titlespan: 4, colspan: 20, required: true},
              {title: '链接', id: 'url', type: 'input', titlespan: 4, colspan: 20, required: false},
              {title: '备注', id: 'remarks', type: 'textarea', titlespan: 4, colspan: 20, required: false},
            ]
          ],
          button: [{type: 'primary', title: _b ? '修改' : '提交', click: 'handle'}]
        }
        this.inputForm.value = {
          name: _b ? row.name : '',
          sortName: _b ? row.sortName : '',
          url: _b ? row.url : '',
          remarks: _b ? row.remarks : '',

          fileImg: '',
          fileImgUrl: _b && row.img ? '<img class="img" width="100%" src="' + row.img + '">' : '<div style="height:110px; line-height: 110px" class="c3 td-render">大小不超过1M</div>',
        }
        if (_b) {
          this.inputForm.value.id = row.id
        }
      },
      /**
       *提交返回处理方法
       * @param val
       * @param type
       */
      getInputVal (val, type) {
        this.inputForm.value = val // 表单填写的内容;
        if (type === 'cancel') { // 按钮操作
          this.inputForm.modalshow = false // 隐藏modal
          return
        }
        let newVal = {}
        Object.assign(newVal, val)
        newVal.menuIds = newVal.menuIds.join()
        this.inputForm.modalDisabled = true
        let msg = this.clickType + '分类'
        this.submitAjax(newVal,'config',msg)
      },
    },
    created () {
      this.$nextTick(() => {
        this.loadTable();
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    margin: 10px;
  }
  .ivu-menu-horizontal{ height: 40px; line-height: 40px;}
</style>
