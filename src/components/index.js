import XtxImageView from './imageView/index.vue'
import XtxSku from './XtxSku/index.vue'

// 把components中的所组件都进行全局化注册
// 通过插件的方式
export const componentPlugin = {
  //install: 在插件被安装到 Vue 应用时自动调用，在任何组件中都可以直接使用，无需单独导入，可以通过 app.use() 来安装插件
  install(app) {
    // app.component('组件名字'，组件配置对象)
    app.component('XtxImageView', XtxImageView)
    app.component('XtxSku', XtxSku)
  }
}