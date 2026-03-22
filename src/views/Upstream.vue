<template>
  <div class="upstream">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">渠道数量</div>
          <div class="stat-value" style="color: #1890ff;">4</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日推送</div>
          <div class="stat-value" style="color: #52c41a;">289</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">API调用</div>
          <div class="stat-value" style="color: #faad14;">1,256</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">成功率</div>
          <div class="stat-value" style="color: #722ed1;">99.2%</div>
        </div>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>上游渠道列表</span>
          <el-button type="primary" size="small">+ 添加渠道</el-button>
        </div>
      </template>
      <el-table :data="channels" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="渠道名称" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="apiKey" label="API Key" width="180">
          <template #default="{ row }">
            <code style="font-size: 12px;">{{ row.apiKey }}****</code>
          </template>
        </el-table-column>
        <el-table-column prop="today" label="今日推送" width="100" />
        <el-table-column prop="price" label="单价(元)" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '启用' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-top: 20px;">
      <template #header>
        <span>API 配置说明</span>
      </template>
      <el-alert type="info" :closable="false">
        <template #title>
          <div>
            <p><strong>上游推送接口：</strong><code>POST /api/inflow</code></p>
          </div>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const channels = ref([
  { id: 1, name: '渠道A-信息流', type: 'API推送', apiKey: 'uk_a1b2c3d4', today: 156, price: 5.0, status: '启用' },
  { id: 2, name: '渠道B-搜索', type: 'API推送', apiKey: 'uk_e5f6g7h8', today: 89, price: 8.0, status: '启用' },
  { id: 3, name: '渠道C-社群', type: 'API推送', apiKey: 'uk_i9j0k1l2', today: 44, price: 3.0, status: '启用' },
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
