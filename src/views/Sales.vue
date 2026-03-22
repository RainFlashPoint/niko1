<template>
  <div class="sales">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>下游客户管理</span>
          <el-button type="primary" size="small">+ 添加客户</el-button>
        </div>
      </template>
      <el-table :data="customers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="客户名称" />
        <el-table-column prop="type" label="客户类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.type === '企业' ? 'success' : 'info'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="apiKey" label="API Key" width="200">
          <template #default="{ row }">
            <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 12px;">
              {{ row.apiKey }}
            </code>
          </template>
        </el-table-column>
        <el-table-column prop="todayCount" label="今日推送" width="100" />
        <el-table-column prop="price" label="单价(元)" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '正常' : '欠费' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
            <el-button link type="primary" size="small">重置Key</el-button>
            <el-button link type="danger" size="small">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>推送数据记录</span>
      </template>
      <el-table :data="pushRecords" style="width: 100%">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="customer" label="客户" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="data" label="推送数据" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>下游 API 调用说明</span>
      </template>
      <el-alert type="warning" :closable="false">
        <template #title>
          <div>
            <p><strong>推送数据接口地址：</strong></p>
            <code style="background: #f5f5f5; padding: 4px 8px; border-radius: 4px;">
              POST http://localhost:3000/api/outflow
            </code>
          </div>
        </template>
      </el-alert>
      <div style="margin-top: 16px;">
        <p style="color: #666; font-size: 13px;">请求参数示例：</p>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 6px; color: #333; font-size: 13px;">{
  "clientId": "client_001",
  "phone": "13812345678",
  "data": {"score": 750, "age": 35, "income": 20000},
  "timestamp": 1700000000000,
  "signature": "md5(clientId + timestamp + secret)"
}</pre>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customers = ref([
  { id: 1, name: '客户张三', type: '企业', apiKey: 'sk_live_abc123****xyz', todayCount: 456, price: 15.0, status: 'active' },
  { id: 2, name: '客户李四', type: '个人', apiKey: 'sk_live_def456****uvw', todayCount: 234, price: 12.0, status: 'active' },
  { id: 3, name: '客户王五', type: '企业', apiKey: 'sk_live_ghi789****rst', todayCount: 0, price: 18.0, status: 'inactive' },
])

const pushRecords = ref([
  { time: '2024-01-15 14:32:15', customer: '客户张三', phone: '138****1234', data: '{"score":750,"age":35}', status: 'success' },
  { time: '2024-01-15 14:30:42', customer: '客户张三', phone: '139****5678', data: '{"score":680,"age":28}', status: 'success' },
  { time: '2024-01-15 14:28:17', customer: '客户李四', phone: '137****9012', data: '{"score":720,"age":42}', status: 'success' },
  { time: '2024-01-15 14:25:33', customer: '客户李四', phone: '136****3456', data: '{"score":550,"age":25}', status: 'failed' },
])
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
}

:deep(.el-card__header) {
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

:deep(.el-card__body) {
  background: #ffffff;
}
</style>
