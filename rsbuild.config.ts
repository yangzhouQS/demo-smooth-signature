import {defineConfig} from '@rsbuild/core';
import {pluginVue} from '@rsbuild/plugin-vue';
import {pluginLess} from '@rsbuild/plugin-less'

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginLess()
  ],
  html: {
    title: 'Vue App',
    mountId: 'app',
    template({entryName}) {
      return './src/demo.html'
    },
  },
  server: {
    port: 8080,
  },
});
