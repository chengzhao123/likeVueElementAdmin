//自定义按钮权限指令
export default {
  bind(el) {
    console.log('bind', el)
  },
  inserted(el, binding) {
    if(binding.value == 'add') {
      el.parentNode.removeChild(el)
    }
  }
}