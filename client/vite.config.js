import { createVuePlugin } from 'vite-plugin-vue2';
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { ElementUiResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    Components({
      /* ui库解析器，也可以自定义 */
      resolvers: [ElementUiResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    /* 别名路径 */
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // css: {
  //   //css预处理
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "@/styles/element-reset.scss";'
  //     }
  //   }
  // },
  server: {
    proxy: {
      '/api': 'http://localhost:3500/',
      // '/project': 'https://news.sina.com.cn/',
    },
  },
});
