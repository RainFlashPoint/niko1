import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Upstream from '../views/Upstream.vue'
import Downstream from '../views/Downstream.vue'
import CRM from '../views/CRM.vue'
import Finance from '../views/Finance.vue'
import Distribute from '../views/Distribute.vue'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'

// 路由配置
const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/upstream', name: 'Upstream', component: Upstream, meta: { requiresAuth: true } },
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

// 权限验证
router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  
  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else if (to.meta.requiresAdmin && user?.role !== 'admin') {
    ElMessage.warning('需要管理员权限')
    next('/')
  } else {
    next()
  }
})

export default router
