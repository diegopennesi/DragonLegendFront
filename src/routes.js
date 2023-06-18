import Home from './components/menuprincipale.vue';
import Adm from './components/AdmPannel.vue';
import Log from './components/changeLog.vue';
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
  {
    path: '/changelog',
    component: Log,
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
  // Aggiungi ulteriori definizioni di route qui
];