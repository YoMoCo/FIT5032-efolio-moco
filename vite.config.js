import { fileURLToPath, URL } from 'node:url'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   publicPath: process.env.NODE_ENV === 'production' ? '/FIT5032-efolio-moco/' : '/' 
// })


// https://vitejs.dev/config/
// export default defineConfig({
//     // base: '/FIT5032-efolio-moco/', 
//     plugins: [
//       vue(),
//       vueDevTools(),
//     ],
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       }
//     },
//     publicPath: process.env.NODE_ENV === 'production' ? '/FIT5032-efolio-moco/' : '/' 
//   })

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/FIT5032-efolio-moco/' : '/', 
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  })
  