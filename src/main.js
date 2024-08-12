import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './style.css';
import { worker } from './mocks/browser';

const workerStart = () =>{
  return worker.start();
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
})
const app = await workerStart().then(() => createApp(App));


app.use(router).use(store).use(vuetify).mount('#app');