import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import Dashboard from '../views/Dashboard.vue'
import Upstream from '../views/Upstream.vue'
import Downstream from '../views/Downstream.vue'
import Finance from '../views/Finance.vue'
import Distribute from '../views/Distribute.vue'
import Landing from '../views/Landing.vue'
import Data from '../views/Data.vue'
import Purchase from '../views/Purchase.vue'
import Sales from '../views/Sales.vue'
import Report from '../views/Report.vue'
import UserManagement from '../views/UserManagement.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/upstream', name: 'Upstream', component: Upstream, meta: { requiresAuth: true } },
  { path: '/downstream', name: 'Downstream', component: Downstream, meta: { requiresAuth: true } },
  { path: '/distribute', name: 'Distribute', component: Distribute, meta: { requiresAuth: true } },
  { path: '/finance', name: 'Finance', component: Finance, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/landing', name: 'Landing', component: Landing, meta: { requiresAuth: true } },
  { path: '/data', name: 'Data', component: Data, meta: { requiresAuth: true } },
  { path: '/purchase', name: 'Purchase', component: Purchase, meta: { requiresAuth: true } },
  { path: '/sales', name: 'Sales', component: Sales, meta: { requiresAuth: true } },
  { path: '/report', name: 'Report', component: Report, meta: { requiresAuth: true } },
  { path: '/users', name: 'UserManagement', component: UserManagement, meta: { requiresAuth: true, requiresAdmin: true } },
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
