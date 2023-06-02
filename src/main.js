import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import TabMenu from 'primevue/tabmenu';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 
import Checkbox from 'primevue/checkbox';
import AutoComplete from 'primevue/autocomplete';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  

//theme
import "primevue/resources/themes/md-dark-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

const app = createApp(App);
app.component('InputNumber',InputNumber);
app.component('Button', Button);
app.component('TabMenu',TabMenu);
app.component('InputText',InputText);
app.component('Card',Card);
app.component('Dialog',Dialog);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('ColumnGroup',ColumnGroup);
app.component('Row',Row);
app.component('Checkbox',Checkbox);
app.component('AutoComplete',AutoComplete); 
app.component('MultiSelect',MultiSelect); 
app.use(PrimeVue);
app.use(router);
app.mount('#app')