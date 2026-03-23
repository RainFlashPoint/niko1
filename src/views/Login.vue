<template>
  <div class="login-page">
    <div class="login-box">
      <h1>🔗 流量中转系统</h1>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" prefix="👤" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" prefix="🔒" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.remember">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="tips">
        <p>测试账号: admin / 123456</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { readStorage, saveStorage, initDefaultData } from '../utils/storage'

const router = useRouter()
const loading = ref(false)
const form = ref({ username: '', password: '', remember: false })

onMounted(() => {
  // 初始化默认数据
  initDefaultData()
  
  // 检查记住用户名
  const remembered = localStorage.getItem('crm_remember_username')
  if (remembered) {
    form.value.username = remembered
    form.value.remember = true
  }
  
  // 检查是否已登录
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
    const users = readStorage('crm_users') || []
    const user = users.find(u => u.username === form.value.username && u.password === form.value.password)
    
    if (user) {
      // 保存用户信息
      const userInfo = { userId: user.id, username: user.username, displayName: user.name, role: user.role }
      saveStorage('crm_user', userInfo)
      saveStorage('crm_last_login', new Date().toISOString())
      
      // 记住用户名
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  width: 400px;
}

.login-box h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.tips {
  text-align: center;
  color: #888;
  font-size: 12px;
  margin-top: 20px;
}
</style>
