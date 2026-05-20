import { useIntersectionObserver } from '@vueuse/core'

//自定义懒加载插件
export const lazyPlugin = {
  //install: 在插件被安装到 Vue 应用时自动调用，在任何组件中都可以直接使用，无需单独导入，可以通过 app.use() 来安装插件
  install(app) {
    app.directive('img-lazy', {
      //el:指令绑定的那个元素 img
      //binding: binding.value 代表等于号右边绑定的表达式的值  图片url
      //mounted: 当指令绑定的元素被插入到 DOM 中时会自动调用。
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            //判断是否进入视口区域
            if (isIntersecting) {
              el.src = binding.value
              stop()
            }
          }
        )
      }
    }
    )

  }
}