
export const tableMixin = {
  data(){
    return {
      timer:{}
    }
  },
  methods: {
    tableChange (type, obj) {
      if(typeof (this[type]) != 'function') return
      switch (type + '') {
        case 'onClickRow':
        case 'onDblClickRow':
          clearTimeout(this.timer)
          this.timer = setTimeout(()=>{
            this[type](obj.row,obj.event,obj.field)
          },0.4* 1000)
          break
        case 'onLoadSuccess':
          this[type](obj.data)
          break
        case 'onCheck':
        case 'onUncheck':
        case 'onUncheckAll':
        case 'onCheckAll':
          this[type](obj.row)
          break
        case 'onColumnSwitch':
          this[type](obj.row,obj.checked)
          break
        default:
      }
    }
  }
}
