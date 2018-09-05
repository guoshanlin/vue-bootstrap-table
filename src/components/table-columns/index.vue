<template>
  <div class="columns-table">
    <Dropdown placement="bottom-end">
      <div class="cursor-p dropdown-columns posct">
        <slot>
          <Icon type="android-menu" size="24"></Icon>
        </slot>
      </div>
      <DropdownMenu slot="list">
        <div class="columns-dropdown">
          <div v-for="(item,index) in columnsTable" :key="index" :class="item.show ? 'columns-table-item checked-item' : 'columns-table-item'" style="width: 140px">
             <Checkbox v-model="item.show" :disabled="checkNumber<= 2&& item.show ? true:false" @on-change="getShowColumns">{{item.title}}</Checkbox>
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        columnsTable: [],
        checkNumber: 0
      }
    },
    props: {
      columns: ''
    },
    watch: {
      columns (val) {
        this.columnsTable = JSON.parse(JSON.stringify(val))
        this.getShowColumns()
      }
    },
    beforeCreate () {
      this.$nextTick(() => {
        this.columnsTable = JSON.parse(JSON.stringify(this.columns))
        this.getShowColumns()
        this.$nextTick(() => {
          this.initScroll(document.querySelectorAll('.columns-dropdown'))
        })
      })
    },
    methods: {
      getShowColumns () {
        let showList = []
        let _num = 0
         for (let item of this.columnsTable) {
          if (item.show) {
            showList.push(_num)
          }
          _num++
        }
         this.checkNumber = showList.length
         this.$emit('change', showList)
      }
    }
  }
</script>

<style scoped>
.columns-dropdown{max-height: 200px;overflow: hidden; overflow: auto}
.dropdown-columns{line-height: 32px; margin: 0 10px}
.dropdown-columns .ivu-icon{font-weight: bold}
.columns-table-item{width: 120px;line-height: 32px;height: 32px;padding: 0 20px;}
.columns-table-item:hover{background-color: #eeeeee}
.columns-table-item.checked-item{background-color: #b2efef}
</style>
