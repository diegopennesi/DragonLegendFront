import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import TabMenu from 'primevue/tabmenu';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';


//theme
import "primevue/resources/themes/nano/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

const app = createApp(App);
app.component('Button', Button);
app.component('TabMenu',TabMenu);
app.component('InputText',InputText);
app.component('Card',Card);
app.component('Dialog',Dialog);
app.use(PrimeVue);
app.mount('#app')