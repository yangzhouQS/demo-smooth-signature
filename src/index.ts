import {createApp} from 'vue';
import App from './App.vue';
import './index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
import "./canvas-style.less"

app.use(ElementPlus)
app.mount('#app');
