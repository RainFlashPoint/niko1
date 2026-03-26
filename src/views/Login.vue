<template>
  <div class="login-page">
    <div class="bg-effect">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
      <div class="circle c3"></div>
    </div>
    <div class="login-container">
      <div class="login-card">
        <div class="logo">
          <div class="logo-icon">🔗</div>
          <h1>流量平台</h1>
          <p class="subtitle">Traffic Distribution Platform</p>
        </div>
        
        <el-form :model="form" @submit.prevent="handleLogin" class="login-form">
          <el-form-item>
            <el-input 
              v-model="form.username" 
              placeholder="请输入用户名" 
              prefix-icon="User"
              size="large"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input 
              v-model="form.password" 
              type="password" 
              placeholder="请输入密码" 
              prefix-icon="Lock"
              size="large"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <div class="remember-row">
              <el-checkbox v-model="form.remember">记住我</el-checkbox>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary" 
              @click="handleLogin" 
              :loading="loading" 
              size="large"
              class="login-btn"
            >
              {{ loading ? '登录中...' : '登 录' }}
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="login-footer">
          <span>© 2026 流量平台</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { saveStorage, initDefaultData } from '../utils/storage'

const router = useRouter()
const loading = ref(false)
const form = ref({ username: '', password: '', remember: false })

const VALID_USERS = [
  { username: 'admin', password: '123456', name: '管理员', role: 'admin' },
  { username: 'user1', password: '123456', name: '张三', role: 'user' },
]

onMounted(() => {
  initDefaultData()
  
  const remembered = localStorage.getItem('crm_remember_username')
  if (remembered) {
    form.value.username = remembered
    form.value.remember = true
  }
  
  const user = localStorage.getItem('crm_user')
  if (user) {
    router.push('/dashboard')
  }
})

function handleLogin() {
  if (!form.value.username || !form.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    const user = VALID_USERS.find(u => u.username === form.value.username && u.password === form.value.password)
    
    if (user) {
      const userInfo = { userId: user.username, username: user.username, displayName: user.name, role: user.role }
      saveStorage('crm_user', userInfo)
      saveStorage('crm_last_login', new Date().toISOString())
      
      if (form.value.remember) {
        localStorage.setItem('crm_remember_username', form.value.username)
      } else {
        localStorage.removeItem('crm_remember_username')
      }
      
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } else {
      ElMessage.error('用户名或密码错误')
    }
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #0a0a0f;
}

.bg-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s infinite ease-in-out;
}

.c1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.c2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  bottom: -150px;
  right: -150px;
  animation-delay: -7s;
}

.c3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(50px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-30px, 50px) scale(0.95);
  }
  75% {
    transform: translate(-50px, -20px) scale(1.02);
  }
}

.login-container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.logo {
  text-align: center;
  margin-bottom: 40px;
}

.logo-icon {
  font-size: 72px;
  margin-bottom: 16px;
  display: inline-block;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.logo h1 {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: 4px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
}

.login-form {
  margin-bottom: 24px;
}

.login-form :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: none;
  padding: 4px 12px;
  height: 48px;
}

.login-form :deep(.el-input__wrapper:hover) {
  border-color: rgba(255, 255, 255, 0.3);
}

.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: #00d2ff;
  box-shadow: 0 0 0 3px rgba(0, 210, 255, 0.15);
}

.login-form :deep(.el-input__inner) {
  color: #fff;
  height: 40px;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

.login-form :deep(.el-input__prefix) {
  color: rgba(255, 255, 255, 0.4);
}

.login-form :deep(.el-checkbox__label) {
  color: rgba(255, 255, 255, 0.7);
}

.remember-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
  border: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -5px rgba(0, 210, 255, 0.4);
}

.login-btn:active {
  transform: translateY(0);
}

.login-footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
}
</style>
