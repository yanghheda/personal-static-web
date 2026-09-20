import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import { countup } from './directives/countup'
import { scramble } from './directives/scramble'
import './styles/main.css'

createApp(App)
  .use(router)
  .directive('reveal', reveal)
  .directive('countup', countup)
  .directive('scramble', scramble)
  .mount('#app')