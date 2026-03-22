<template>
  <div class="purchase">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>上游渠道管理</span>
          <el-button type="primary" size="small">+ 添加渠道</el-button>
        </div>
      </template>
      <el-table :data="channels" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="渠道名称" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="apiUrl" label="API地址" />
        <el-table-column prop="todayCount" label="今日流量" width="100" />
        <el-table-column prop="cost" label="单价(元)" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">配置</el-button>
            <el-button link type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>流量数据明细</span>
          <el-input placeholder="搜索手机号" style="width: 200px;" />
        </div>
      </template>
      <el-table :data="flowData" style="width: 100%">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="source" label="渠道" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="amount" label="期望额度" width="100" />
        <el-table-column prop="area" label="地区" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag type="success">已接收</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px; justify-content: flex-end;" 
        layout="prev, pager, next" :total="500" />
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>API 配置说明</span>
      </template>
      <el-alert type="info" :closable="false">
        <template #title>
          <div>
            <p><strong>上游调用接口地址：</strong></p>
            <code style="background: #f5f5f5; padding: 4px 8px; border-radius: 4px;">
              POST http://localhost:3000/api/inflow
            </code>
          </div>
        </template>
      </el-alert>
      <div style="margin-top: 16px;">
        <p style="color: #666; font-size: 13px;">请求参数示例：</p>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 6px; color: #333; font-size: 13px;">{
  "source": "channel_a",
  "phone": "13812345678",
  "name": "张三",
  "amount": "50000",
  "area": "北京",
  "timestamp": 1700000000000
}</pre>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const channels = ref([
  { id: 1, name: '渠道A-信息流', type: '信息流', apiUrl: 'http://api.channel-a.com/push', todayCount: 1245, cost: 8.5, status: 'active' },
  { id: 2, name: '渠道B-搜索', type: '搜索', apiUrl: 'http://api.channel-b.com/push', todayCount: 856, cost: 12.0, status: 'active' },
  { id: 3, name: '渠道C-社群', type: '社群', apiUrl: 'http://api.channel-c.com/push', todayCount: 432, cost: 5.0, status: 'active' },
  { id: 4, name: '渠道D-线下', type: '线下', apiUrl: 'http://api.channel-d.com/push', todayCount: 0, cost: 15.0, status: 'inactive' },
])

const flowData = ref([
  { time: '2024-01-15 14:32:15', source: '渠道A-信息流', phone: '138****1234', name: '张*', amount: '50000', area: '北京', status: '已接收' },
  { time: '2024-01-15 14:30:42', source: '渠道B-搜索', phone: '139****5678', name: '李*', amount: '30000', area: '上海', status: '已接收' },
  { time: '2024-01-15 14:28:17', source: '渠道A-信息流', phone: '137****9012', name: '王*', amount: '80000', area: '深圳', status: '已接收' },
  { time: '2024-01-15 14:25:33', source: '渠道C-社群', phone: '136****3456', name: '赵*', amount: '20000', area: '广州', status: '已接收' },
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
