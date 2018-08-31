
export const tableMixin = {
  data(){
    return {

    }
  },
  methods: {
    tableChange (type, obj) {
      switch (type + '') {
        case 'onClickRow':
        case 'onDblClickRow':
          this[type + ''](obj.row,obj.event,obj.field)
          break
        case 'onLoadSuccess':
          this[type + ''](obj.data)
          break
        case 'onCheck':
        case 'onUncheck':
        case 'onUncheckAll':
        case 'onCheckAll':
          this[type + ''](obj.row)
          break
        case 'onColumnSwitch':
          this[type + ''](obj.row,obj.checked)
          break
        default:
      }
    }
  }
}
