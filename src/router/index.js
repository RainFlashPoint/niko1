import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Upstream from '../views/Upstream.vue'
import Downstream from '../views/Downstream.vue'
import CRM from '../views/CRM.vue'
import Finance from '../views/Finance.vue'
import Distribute from '../views/Distribute.vue'
import Landing from '../views/Landing.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/upstream', name: 'Upstream', component: Upstream },
  { path: '/downstream', name: 'Downstream', component: Downstream },
  { path: '/crm', name: 'CRM', component: CRM },
  { path: '/distribute', name: 'Distribute', component: Distribute },
  { path: '/finance', name: 'Finance', component: Finance },
  { path: '/landing', name: 'Landing', component: Landing },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
