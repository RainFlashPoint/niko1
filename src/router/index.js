import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import Dashboard from '../views/Dashboard.vue'
import Upstream from '../views/Upstream.vue'
import UpstreamLeads from '../views/UpstreamLeads.vue'
import Downstream from '../views/Downstream.vue'
import CRM from '../views/CRM.vue'
import Finance from '../views/Finance.vue'
import Distribute from '../views/Distribute.vue'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/upstream', name: 'Upstream', component: Upstream, meta: { requiresAuth: true } },
  { path: '/upstream-leads', name: 'UpstreamLeads', component: UpstreamLeads, meta: { requiresAuth: true } },
  { path: '/downstream', name: 'Downstream', component: Downstream, meta: { requiresAuth: true } },
  { path: '/crm', name: 'CRM', component: CRM, meta: { requiresAuth: true } },
  { path: '/distribute', name: 'Distribute', component: Distribute, meta: { requiresAuth: true } },
  { path: '/finance', name: 'Finance', component: Finance, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/landing', name: 'Landing', component: Landing, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem('crm_user')
  const user = userStr ? JSON.parse(userStr) : null
  
  if (to.path !== '/' && to.meta.requiresAuth && !user) {
    next('/')
  } else if (to.path === '/' && user) {
    next('/dashboard')
  } else if (to.meta.requiresAdmin && user?.role !== 'admin') {
    ElMessage.warning('需要管理员权限')
    next('/dashboard')
  } else {
    next()
  }
})

export default router
