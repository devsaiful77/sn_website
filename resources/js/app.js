import { createApp } from 'vue'
import './assets/css/style.css'
import './admin/admin.css'
import App from './App.vue'
import router from './router'
import { revealDirective } from './directives/reveal'

const app = createApp(App)
app.use(router)
app.directive('reveal', revealDirective)
app.mount('#app')
