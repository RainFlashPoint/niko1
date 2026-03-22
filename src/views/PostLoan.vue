<template>
  <div class="postloan">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">在贷余额</div>
          <div class="stat-value" style="color: #1890ff;">¥2,847,000</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">待还款</div>
          <div class="stat-value" style="color: #faad14;">¥156,000</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">逾期数量</div>
          <div class="stat-value" style="color: #ff4d4f;">23</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">M1+逾期率</div>
          <div class="stat-value" style="color: #722ed1;">1.85%</div>
        </div>
      </el-col>
    </el-row>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>还款管理</span>
          <el-input placeholder="搜索手机号/姓名" style="width: 200px;" />
        </div>
      </template>
      <el-table :data="repayments" style="width: 100%">
        <el-table-column prop="id" label="还款ID" width="100" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="amount" label="应还金额" width="120" />
        <el-table-column prop="dueDate" label="到期日" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" width="100" />
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">提醒</el-button>
            <el-button link type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>催收管理</span>
      </template>
      <el-table :data="collections" style="width: 100%">
        <el-table-column prop="id" label="催收ID" width="100" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="overdueAmount" label="逾期金额" width="120" />
        <el-table-column prop="overdueDays" label="逾期天数" width="100" />
        <el-table-column prop="level" label="催收等级" width="100">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="assignee" label="催收员" width="100" />
        <el-table-column prop="result" label="催收结果" width="150" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small">跟进</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>催收策略配置</span>
      </template>
      <el-table :data="strategies" style="width: 100%">
        <el-table-column prop="name" label="策略名称" />
        <el-table-column prop="trigger" label="触发条件" width="200" />
        <el-table-column prop="action" label="执行动作" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const repayments = ref([
  { id: 'RP001', name: '张三', phone: '138****1234', amount: '2,500', dueDate: '2024-01-20', status: '正常', overdueDays: 0 },
  { id: 'RP002', name: '李四', phone: '139****5678', amount: '1,800', dueDate: '2024-01-18', status: '逾期', overdueDays: 2 },
  { id: 'RP003', name: '王五', phone: '137****9012', amount: '3,200', dueDate: '2024-01-15', status: '严重逾期', overdueDays: 15 },
  { id: 'RP004', name: '赵六', phone: '136****3456', amount: '980', dueDate: '2024-01-20', status: '正常', overdueDays: 0 },
])

const collections = ref([
  { id: 'COL001', name: '王五', phone: '137****9012', overdueAmount: '3,200', overdueDays: 15, level: 'M2', assignee: '催收员A', result: '承诺本周还款' },
  { id: 'COL002', name: '李四', phone: '139****5678', overdueAmount: '1,800', overdueDays: 2, level: 'M1', assignee: '催收员B', result: '已还款' },
  { id: 'COL003', name: '钱七', phone: '135****7890', overdueAmount: '5,600', overdueDays: 30, level: 'M3', assignee: '催收员A', result: '无法联系' },
])

const strategies = ref([
  { name: 'M1短信提醒', trigger: '逾期1天', action: '自动发送短信提醒', status: true },
  { name: 'M1电话催收', trigger: '逾期3天', action: '分配给催收员电话联系', status: true },
  { name: 'M2上门催收', trigger: '逾期15天', action: '分配给催收员上门拜访', status: true },
  { name: 'M3法务介入', trigger: '逾期30天', action: '转交法务部门', status: false },
])

const getStatusType = (status) => {
  const map = { '正常': 'success', '逾期': 'warning', '严重逾期': 'danger' }
  return map[status] || 'info'
}

const getLevelType = (level) => {
  const map = { 'M1': 'warning', 'M2': 'danger', 'M3': 'danger' }
  return map[level] || 'info'
}
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
