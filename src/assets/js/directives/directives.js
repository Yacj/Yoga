//全局指令 v-focusDel
import Vue from 'vue'

//input删除获取焦点
Vue.directive('focusDel', {
    inserted (el, binding) {
    },
    bind (el, binding) {
        let input = el.querySelector('input')
        let deleteIcon = el.querySelector('.icon')
        input.oninput = function () {
            if (input.value) {
                deleteIcon.style.display = 'block'
            }
        }
        input.onfocus = function () {
            if (input.value) {
                deleteIcon.style.display = 'block'
            }
        }
        input.onblur = function () {
            setTimeout(() => {
                deleteIcon.style.display = 'none'
            }, 0)
        }
        deleteIcon.onclick = function () {
            input.focus()
            input.value = ''
        }
    },
    update (el) {
    },
    componentUpdated (el) {
    },
    unbind () {
    }
})
//input自动获取焦点
Vue.directive('focus', {
    inserted (el, binding) {
        el.focus()
    },
    bind (el) {
        el.focus()
    }
})

