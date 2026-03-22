<template>
  <div class="landing-page">
    <div class="phone-frame">
      <div class="phone-header">
        <span>☝️ 额度评估</span>
      </div>
      <div class="phone-content">
        <div class="hero-section">
          <h1>💰 额度高至 50 万</h1>
          <p>最快 3 分钟到账</p>
        </div>

        <el-form :model="form" label-position="top" class="apply-form">
          <el-form-item label="您的姓名">
            <el-input v-model="form.name" placeholder="请输入姓名" />
          </el-form-item>
          
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
          </el-form-item>
          
          <el-form-item label="期望额度">
            <el-select v-model="form.amount" placeholder="请选择额度" style="width: 100%;">
              <el-option label="5万以下" value="50000" />
              <el-option label="5-10万" value="100000" />
              <el-option label="10-20万" value="200000" />
              <el-option label="20-50万" value="500000" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="所在地区">
            <el-cascader
              v-model="form.area"
              :options="areaOptions"
              placeholder="请选择地区"
              style="width: 100%;"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" size="large" class="submit-btn" @click="handleSubmit">
              立即申请
            </el-button>
          </el-form-item>
        </el-form>

        <div class="features">
          <div class="feature-item">
            <span class="feature-icon">🚀</span>
            <span>极速审批</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔒</span>
            <span>信息安全</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <span>全程线上</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <h4>📋 API 测试说明</h4>
      <p>提交表单后，数据将发送到：<code>POST /api/inflow</code></p>
      <el-button type="primary" size="small" @click="testApi">测试 API</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = ref({
  name: '',
  phone: '',
  amount: '',
  area: []
})

const areaOptions = [
  { value: '北京', label: '北京', children: [{ value: '朝阳', label: '朝阳' }, { value: '海淀', label: '海淀' }] },
  { value: '上海', label: '上海', children: [{ value: '浦东', label: '浦东' }, { value: '黄浦', label: '黄浦' }] },
  { value: '广东', label: '广东', children: [{ value: '广州', label: '广州' }, { value: '深圳', label: '深圳' }] },
]

const handleSubmit = async () => {
  if (!form.value.name || !form.value.phone || !form.value.amount || !form.value.area.length) {
    ElMessage.warning('请填写完整信息')
    return
  }

  try {
    const response = await fetch('/api/inflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'landing_page',
        phone: form.value.phone,
        name: form.value.name,
        amount: form.value.amount,
        area: form.value.area.join(''),
        timestamp: Date.now()
      })
    })
    const data = await response.json()
    if (data.record) {
      ElMessage.success('提交成功！')
    }
  } catch (e) {
    ElMessage.success('提交成功（Demo模式）')
  }
}

const testApi = async () => {
  try {
    await fetch('/api/inflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'test',
        phone: '13800138000',
        name: '测试用户',
        amount: '100000',
        area: '北京',
        timestamp: Date.now()
      })
    })
    ElMessage.success('API 测试成功！')
  } catch (e) {
    ElMessage.error('请先启动 Mock API 服务器')
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.phone-frame {
  width: 375px;
  height: 750px;
  background: #ffffff;
  border-radius: 40px;
  border: 8px solid #e8e8e8;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.phone-header {
  background: linear-gradient(135deg, #1890ff, #52c41a);
  padding: 16px;
  text-align: center;
  color: #fff;
  font-weight: bold;
}

.phone-content {
  padding: 20px;
  height: calc(100% - 60px);
  overflow-y: auto;
  background: #f5f5f5;
}

.hero-section {
  text-align: center;
  padding: 30px 0;
  background: linear-gradient(135deg, #1890ff, #52c41a);
  border-radius: 16px;
  margin-bottom: 24px;
}

.hero-section h1 {
  color: #fff;
  font-size: 28px;
  margin: 0 0 8px 0;
}

.hero-section p {
  color: #fff;
  font-size: 16px;
  margin: 0;
}

.apply-form {
  margin-top: 20px;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #1890ff, #52c41a);
  border: none;
  font-size: 18px;
  font-weight: bold;
  height: 50px;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e8e8e8;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  font-size: 12px;
}

.feature-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.tips {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.tips h4 {
  color: #333;
  margin: 0 0 12px 0;
}

.tips p {
  color: #666;
  font-size: 14px;
}

.tips code {
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  color: #1890ff;
}

:deep(.el-form-item__label) {
  color: #666;
}

:deep(.el-input__wrapper) {
  background: #fff;
  box-shadow: none;
  border: 1px solid #d9d9d9;
}

:deep(.el-input__inner) {
  color: #333;
}
</style>
