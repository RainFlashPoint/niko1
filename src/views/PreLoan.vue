<template>
  <div class="preloan">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">待审核进件</div>
          <div class="stat-value" style="color: #faad14;">156</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日进件</div>
          <div class="stat-value" style="color: #1890ff;">423</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">通过率</div>
          <div class="stat-value" style="color: #52c41a;">68.5%</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">平均审批时间</div>
          <div class="stat-value" style="color: #722ed1;">2.3分钟</div>
        </div>
      </el-col>
    </el-row>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>进件管理</span>
          <el-input placeholder="搜索手机号/姓名" style="width: 200px;" />
        </div>
      </template>
      <el-table :data="applications" style="width: 100%">
        <el-table-column prop="id" label="进件ID" width="100" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="amount" label="申请金额" width="120" />
        <el-table-column prop="product" label="产品" width="150" />
        <el-table-column prop="source" label="来源" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" width="180" />
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">审核</el-button>
            <el-button link type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>授信管理 - 风控初筛规则</span>
      </template>
      <el-table :data="rules" style="width: 100%">
        <el-table-column prop="name" label="规则名称" />
        <el-table-column prop="type" label="规则类型" width="120" />
        <el-table-column prop="condition" label="条件" />
        <el-table-column prop="action" label="动作" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>额度管理</span>
      </template>
      <el-table :data="quotaData" style="width: 100%">
        <el-table-column prop="level" label="信用等级" width="100" />
        <el-table-column prop="scoreRange" label="信用分区间" width="150" />
        <el-table-column prop="minQuota" label="最低额度" width="120" />
        <el-table-column prop="maxQuota" label="最高额度" width="120" />
        <el-table-column prop="rate" label="利率范围" width="120" />
        <el-table-column prop="term" label="期限" width="100" />
        <el-table-column label="操作" width="100">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const applications = ref([
  { id: 'JD20240320001', name: '张三', phone: '138****1234', amount: '50,000', product: '闪电贷', source: 'H5落地页', status: '待审核', createTime: '2024-01-15 14:32:15' },
  { id: 'JD20240320002', name: '李四', phone: '139****5678', amount: '30,000', product: '消费分期', source: '渠道A', status: '通过', createTime: '2024-01-15 14:30:42' },
  { id: 'JD20240320003', name: '王五', phone: '137****9012', amount: '80,000', product: '企业贷', source: '渠道B', status: '拒绝', createTime: '2024-01-15 14:28:17' },
  { id: 'JD20240320004', name: '赵六', phone: '136****3456', amount: '20,000', product: '信用卡代还', source: '社群', status: '待审核', createTime: '2024-01-15 14:25:33' },
])

const rules = ref([
  { name: '年龄校验', type: '基础', condition: '22岁 ≤ 年龄 ≤ 55岁', action: '通过/拒绝', status: true },
  { name: '黑名单校验', type: '黑名单', condition: '不在央行黑名单', action: '拒绝', status: true },
  { name: '多头借贷', type: '风控', condition: '近3月申请平台 ≤ 5家', action: '人工审核', status: true },
  { name: '手机号校验', type: '基础', condition: '手机号实名认证', action: '通过/拒绝', status: true },
])

const quotaData = ref([
  { level: 'A', scoreRange: '750-850', minQuota: '30,000', maxQuota: '200,000', rate: '7.2%-12%', term: '3-24期' },
  { level: 'B', scoreRange: '650-749', minQuota: '10,000', maxQuota: '100,000', rate: '12%-18%', term: '3-12期' },
  { level: 'C', scoreRange: '550-649', minQuota: '5,000', maxQuota: '30,000', rate: '18%-24%', term: '3-6期' },
  { level: 'D', scoreRange: '450-549', minQuota: '1,000', maxQuota: '10,000', rate: '24%-36%', term: '3期' },
])

const getStatusType = (status) => {
  const map = { '待审核': 'warning', '通过': 'success', '拒绝': 'danger', '人工审核': 'info' }
  return map[status] || 'info'
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
