<template>
  <div class="crm">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">渠道总数</div>
          <div class="stat-value" style="color: #1890ff;">1,256</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">活跃渠道</div>
          <div class="stat-value" style="color: #52c41a;">856</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">待审核</div>
          <div class="stat-value" style="color: #faad14;">23</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日新增</div>
          <div class="stat-value" style="color: #722ed1;">15</div>
        </div>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>渠道列表</span>
          <div>
            <el-select placeholder="渠道类型" style="width: 120px; margin-right: 10px;">
              <el-option label="全部" value="" />
              <el-option label="上游" value="upstream" />
              <el-option label="下游" value="downstream" />
            </el-select>
            <el-input placeholder="搜索渠道" style="width: 150px;" />
            <el-button type="primary" size="small" style="margin-left: 10px;">+ 添加渠道</el-button>
          </div>
        </div>
      </template>
      <el-table :data="customers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="渠道名称" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '上游' ? 'success' : 'warning'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人" width="120" />
        <el-table-column prop="phone" label="电话" width="140" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : row.status === '待审核' ? 'warning' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="转化率" label="转化率" width="100">
          <template #default="{ row }">
            <span style="color: #52c41a;">{{ row.转化率 }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column label="操作" width="100">
          <template #default>
            <el-button link type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customers = ref([
  { id: 1, name: '渠道A公司', type: '上游', contact: '张经理', phone: '138****1234', status: '正常', 转化率: 85, createTime: '2024-01-01' },
  { id: 2, name: '客户张三', type: '下游', contact: '李总', phone: '139****5678', status: '正常', 转化率: 72, createTime: '2024-01-05' },
  { id: 3, name: '渠道B公司', type: '上游', contact: '王经理', phone: '137****9012', status: '待审核', 转化率: 0, createTime: '2024-01-15' },
  { id: 4, name: '客户李四', type: '下游', contact: '赵总', phone: '136****3456', status: '正常', 转化率: 68, createTime: '2024-01-10' },
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
