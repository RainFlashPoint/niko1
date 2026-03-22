<template>
  <div class="capital">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">总资金方数量</div>
          <div class="stat-value" style="color: #1890ff;">8</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">在途资金</div>
          <div class="stat-value" style="color: #52c41a;">¥5,680,000</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">本月分润</div>
          <div class="stat-value" style="color: #faad14;">¥285,400</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">待结算</div>
          <div class="stat-value" style="color: #ff4d4f;">¥42,800</div>
        </div>
      </el-col>
    </el-row>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>资金方管理</span>
          <el-button type="primary" size="small">+ 添加资金方</el-button>
        </div>
      </template>
      <el-table :data="funders" style="width: 100%">
        <el-table-column prop="id" label="资金方ID" width="100" />
        <el-table-column prop="name" label="资金方名称" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="quota" label="授信额度" width="120" />
        <el-table-column prop="used" label="已用额度" width="120" />
        <el-table-column prop="balance" label="可用额度" width="120" />
        <el-table-column prop="rate" label="分润比例" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">配置</el-button>
            <el-button link type="primary" size="small">对账</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>分润结算记录</span>
          <el-input placeholder="搜索资金方" style="width: 200px;" />
        </div>
      </template>
      <el-table :data="settlements" style="width: 100%">
        <el-table-column prop="id" label="结算ID" width="100" />
        <el-table-column prop="funder" label="资金方" width="150" />
        <el-table-column prop="period" label="结算周期" width="120" />
        <el-table-column prop="amount" label="分润金额" width="120">
          <template #default="{ row }">
            <span style="color: #52c41a;">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="volume" label="放款笔数" width="100" />
        <el-table-column prop="volumeAmount" label="放款金额" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已结算' ? 'success' : 'warning'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="settleTime" label="结算时间" width="180" />
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>资金路由配置</span>
      </template>
      <el-alert type="info" :closable="false" style="margin-bottom: 15px;">
        <template #title>
          <div>当多个资金方可用时，系统根据以下规则自动分配贷款申请</div>
        </template>
      </el-alert>
      <el-table :data="routes" style="width: 100%">
        <el-table-column prop="name" label="规则名称" />
        <el-table-column prop="condition" label="触发条件" width="250" />
        <el-table-column prop="action" label="执行动作" />
        <el-table-column prop="priority" label="优先级" width="80" />
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

const funders = ref([
  { id: 'F001', name: '银行A', type: '银行', quota: '10,000,000', used: '6,500,000', balance: '3,500,000', rate: '70%', status: '正常' },
  { id: 'F002', name: '消费金融B', type: '消金', quota: '5,000,000', used: '3,200,000', balance: '1,800,000', rate: '65%', status: '正常' },
  { id: 'F003', name: '小贷公司C', type: '小贷', quota: '2,000,000', used: '1,800,000', balance: '200,000', rate: '60%', status: '额度不足' },
  { id: 'F004', name: '信托D', type: '信托', quota: '8,000,000', used: '4,500,000', balance: '3,500,000', rate: '72%', status: '正常' },
])

const settlements = ref([
  { id: 'S001', funder: '银行A', period: '2024-01(上)', amount: '156,800', volume: 456, volumeAmount: '2,280,000', status: '已结算', settleTime: '2024-01-15 10:00:00' },
  { id: 'S002', funder: '消费金融B', period: '2024-01(上)', amount: '89,200', volume: 234, volumeAmount: '890,000', status: '已结算', settleTime: '2024-01-15 10:00:00' },
  { id: 'S003', funder: '银行A', period: '2024-01(下)', amount: '128,600', volume: 380, volumeAmount: '1,900,000', status: '待结算', settleTime: '-' },
])

const routes = ref([
  { name: '额度优先', condition: '申请金额 > 20万', action: '优先匹配银行A', priority: 1, status: true },
  { name: '通过率优先', condition: '用户信用分 >= 750', action: '优先匹配银行A', priority: 2, status: true },
  { name: '额度分配', condition: '各资金方轮流分配', action: '轮询分配', priority: 3, status: true },
  { name: '备用方案', condition: '前规则均未匹配', action: '匹配可用资金方', priority: 99, status: true },
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
