import Home from './components/menuprincipale.vue';
import Adm from './components/AdmPannel.vue';
import NotFound from './components/NotFound.vue';

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/adm',
    component: Adm,
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
  // Aggiungi ulteriori definizioni di route qui
];