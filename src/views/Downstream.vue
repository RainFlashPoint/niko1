<template>
  <div class="downstream">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">客户数量</div>
          <div class="stat-value" style="color: #1890ff;">6</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日推送</div>
          <div class="stat-value" style="color: #52c41a;">234</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">本月收入</div>
          <div class="stat-value" style="color: #faad14;">¥28,540</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">待结算</div>
          <div class="stat-value" style="color: #722ed1;">¥4,280</div>
        </div>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>下游客户列表</span>
          <el-button type="primary" size="small">+ 添加客户</el-button>
        </div>
      </template>
      <el-table :data="customers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="客户名称" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '企业' ? 'success' : 'info'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="apiUrl" label="回调地址" />
        <el-table-column prop="today" label="今日推送" width="100" />
        <el-table-column prop="price" label="单价(元)" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">重置Key</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-top: 20px;">
      <template #header>
        <span>API 配置说明</span>
      </template>
      <el-alert type="warning" :closable="false">
        <template #title>
          <div>
            <p><strong>下游回调接口：</strong><code>POST /api/outflow</code>（我们主动推送给他们）</p>
          </div>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customers = ref([
  { id: 1, name: '客户张三', type: '企业', apiUrl: 'https://api.client-a.com/callback', today: 156, price: 15.0, status: '正常' },
  { id: 2, name: '客户李四', type: '个人', apiUrl: 'https://api.client-b.com/webhook', today: 78, price: 12.0, status: '正常' },
  { id: 3, name: '客户王五', type: '企业', apiUrl: 'https://api.client-c.com/push', today: 0, price: 18.0, status: '欠费' },
])
</script>

<style scoped>
.stat-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stat-title {
  color: #999;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
