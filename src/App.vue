<template>
  <div class="app-container">
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">🔗</span>
        <span class="logo-text">流量中转</span>
      </div>
      <el-menu
        :default-active="route.path"
        router
        background-color="#ffffff"
        text-color="#666666"
        active-text-color="#1890ff"
      >
        <el-menu-item index="/">
          <span>📊 仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/upstream">
          <span>📥 上游管理</span>
        </el-menu-item>
        <el-menu-item index="/downstream">
          <span>📤 下游管理</span>
        </el-menu-item>
        <el-menu-item index="/crm">
          <span>👥 CRM</span>
        </el-menu-item>
        <el-menu-item index="/distribute">
          <span>🔄 分发配置</span>
        </el-menu-item>
        <el-menu-item index="/finance" v-if="isAdmin">
          <span>💰 财务</span>
        </el-menu-item>
        <el-menu-item index="/landing">
          <span>📱 H5落地页</span>
        </el-menu-item>
      </el-menu>
    </aside>
    <main class="main-content">
      <header class="header">
        <h2>{{ pageTitle }}</h2>
        <div class="user-info">
          <el-dropdown @command="handleCommand">
            <span class="user-dropdown">
              <span>👤 {{ userName }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <div class="content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const user = computed(() => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
})

const userName = computed(() => user.value?.name || '未登录')
const isAdmin = computed(() => user.value?.role === 'admin')

const pageTitle = computed(() => {
  const titles = {
    '/': '仪表盘',
    '/upstream': '上游管理',
    '/downstream': '下游管理',
    '/crm': '渠道CRM',
    '/distribute': '分发配置',
    '/finance': '财务管理',
    '/landing': 'H5落地页'
  }
  return titles[route.path] || '流量中转'
})

const handleCommand = (command) => {
  if (command === 'logout') {
    localStorage.removeItem('user')
    ElMessage.success('已退出登录')
    router.push('/login')
  }
}

onMounted(() => {
  // 未登录跳转到登录页
  if (!user.value && route.path !== '/login') {
    router.push('/login')
  }
})
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 200px;
  background: #ffffff;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  color: #1890ff;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #f0f0f0;
}

.logo-icon {
  font-size: 24px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #666;
}

.user-dropdown:hover {
  color: #1890ff;
}

.content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}

:deep(.el-menu-item.is-active) {
  background: #e6f7ff !important;
}
</style>
