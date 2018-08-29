<template>
  <div>
    <h3>这是一个table测试</h3>
    <table id="table"></table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '这是一个测试页面'
    }
  },
  methods: {
    test () {
      console.log($);
      console.log($('#ss')[0].innerHTML);
    },
    initTable () {
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
        clickToSelect:false,
        showToggle: false,
        // pageSize: 20,
        // pageNumber: 1,
        // pageList: [10,20,50],
        search: false, //不显示 搜索框
        showColumns: true, //不显示下拉框（选择显示的列）
        sidePagination: "server", //服务端请求
        toolbar: "#tableToolbar",
        // height: allEvents.getTableHeight(),
        queryParams:function(params){
          // return $.extend(utils.cleanCacheParam(), params, _params);
        },
        responseHandler:function(res) {},//单击选中事件以及单击＋shift选中事件
        onClickRow:function(row,$element, field) {},
        onDblClickRow:function(row,$element, field) {},
        onLoadSuccess:function(data){},
        onPostBody: function(){},
        onCheck: function (row) {},
        onUncheck: function (row) {},
        onUncheckAll: function (row) {},
        onCheckAll: function (row) {},
        onColumnSwitch:function (field,checked) {},
        columns: [{
          field: 'id',
          title: 'Item ID'
        }, {
          field: 'name',
          title: 'Item Name'
        }, {
          field: 'price',
          title: 'Item Price'
        }],
        data: [{
          id: 1,
          name: 'Item 1',
          price: '$1'
        }, {
          id: 2,
          name: 'Item 2',
          price: '$2'
        }]
      });
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initTable()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
