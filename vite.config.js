// 从 Node.js 内置模块导入 URL 处理工具
// fileURLToPath: 将 file:// 格式的 URL 转换为文件系统路径
// URL: URL 构造函数，用于解析和操作 URL
import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite' // 导入 Vite 的配置函数（用于包装配置对象，提供类型提示）
import vue from '@vitejs/plugin-vue' //导入 Vue 插件（让 Vite 能识别和编译 .vue 单文件组件）
//import removeConsole from 'vite-plugin-remove-console' // 先安装插件npm install -D vite-plugin-remove-console，再引入配置插件，移除console.log
//element+ 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    // 构建配置,npm run build 时使用
    plugins: [
        vue(),
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({importStyle: "sass"})],
        }),
        // removeConsole()  // 生产环境自动移除 console.log
    ],
    resolve: {  //路径别名
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {      //SCSS 全局样式注入
        preprocessorOptions: {
            scss: {
                // 自动导入定制化样式文件进行样式覆盖
                additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
            }
        }
    },
    // ═══ 新增：开发服务器配置 ═══
    server: {
        port: 5173,  // 开发服务器端口号，默认 5173
        
        // 开启强制 HTTPS（可选）
        // https: true,
        
        proxy: {        // 代理配置（开发时使用）
            // 匹配所有以 /api 开头的请求
            // 这里需要配合 .env.development 一起改
            '/api': {
                target: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
