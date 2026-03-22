<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <div class="logo">
            <span class="logo-icon">🔗</span>
            <span class="logo-text">流量中转平台</span>
          </div>
          <p class="subtitle">信贷流量服务管理平台</p>
        </div>
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input 
              v-model="form.username" 
              placeholder="请输入用户名"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              v-model="form.password" 
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              size="large"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.role" placeholder="选择角色" size="large" style="width: 100%;">
              <el-option label="管理员" value="admin" />
              <el-option label="普通用户" value="user" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              style="width: 100%;"
              :loading="loading"
              @click="handleLogin"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="login-footer">
          <div class="test-accounts">
            <span class="account-tag admin">管理员: admin / admin123</span>
            <span class="account-tag">用户: user / user123</span>
          </div>
        </div>
      </div>
      <div class="copyright">
        © 2024 流量中转平台 · 让流量创造价值
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const formRef = ref()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  role: 'admin'
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const users = {
  'admin': { password: 'admin123', role: 'admin', name: '管理员' },
  'user': { password: 'user123', role: 'user', name: '普通用户' }
}

const handleLogin = async () => {
  await formRef.value.validate()
  
  loading.value = true
  
  setTimeout(() => {
    const user = users[form.username]
    
    if (user && user.password === form.password) {
      localStorage.setItem('user', JSON.stringify({
        username: form.username,
        name: user.name,
        role: user.role,
        token: 'mock-token-' + Date.now()
      }))
      
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
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.shape-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -200px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  bottom: -100px;
  left: -100px;
  animation: float 15s ease-in-out infinite reverse;
}

.shape-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.15; }
}

.login-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 420px;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 36px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo-icon {
  font-size: 36px;
}

.logo-text {
  font-size: 26px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #999;
  font-size: 14px;
}

.login-footer {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.test-accounts {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.account-tag {
  display: inline-block;
  padding: 6px 12px;
  background: #f5f7fa;
  border-radius: 6px;
  color: #666;
  font-size: 12px;
}

.account-tag.admin {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.copyright {
  margin-top: 32px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
}

:deep(.el-input__wrapper) {
  padding: 8px 12px;
  border-radius: 8px;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #667eea inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #667eea inset;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 2px;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
}
</style>
