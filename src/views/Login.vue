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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loading = ref(false)
const form = ref({ username: '', password: '' })

// 模拟用户数据
const mockUsers = [
  { id: 1, name: '管理员', username: 'admin', password: '123456', role: 'admin' },
  { id: 2, name: '张三', username: 'zhangsan', password: '123456', role: 'user' },
  { id: 3, name: '李四', username: 'lisi', password: '123456', role: 'user' },
]

function handleLogin() {
  loading.value = true
  
  setTimeout(() => {
    const user = mockUsers.find(u => u.username === form.value.username && u.password === form.value.password)
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
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
