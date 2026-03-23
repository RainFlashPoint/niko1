<template>
  <div class="finance-page">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">总收入</div>
          <div class="stat-value">¥{{ stats.totalRevenue }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">今日收入</div>
          <div class="stat-value">¥{{ stats.todayRevenue }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">上游分成</div>
          <div class="stat-value">¥{{ stats.upstreamCost }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">净利润</div>
          <div class="stat-value" style="color: #67C23A">¥{{ stats.profit }}</div>
        </div>
      </el-col>
    </el-row>

    <el-tabs v-model="activeTab" style="margin-top: 20px">
      <el-tab-pane label="收入记录" name="revenue">
        <el-table :data="revenueData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="120" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="amount" label="金额">
            <template #default="{ row }">
              <span style="color: #67C23A">+¥{{ row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="支出记录" name="expense">
        <el-table :data="expenseData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="120" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="amount" label="金额">
            <template #default="{ row }">
              <span style="color: #F56C6C">-¥{{ row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('revenue')

const stats = ref({
  totalRevenue: '125,680',
  todayRevenue: '8,560',
  upstreamCost: '78,450',
  profit: '47,230'
})

const revenueData = ref([
  { date: '2026-03-23', type: '下游消费', amount: '8,560', remark: '日常收入' },
  { date: '2026-03-22', type: '下游消费', amount: '7,230', remark: '日常收入' },
  { date: '2026-03-21', type: '下游消费', amount: '9,120', remark: '日常收入' },
  { date: '2026-03-20', type: '下游消费', amount: '6,890', remark: '日常收入' },
])

const expenseData = ref([
  { date: '2026-03-23', type: '上游分成', amount: '5,136', remark: '上游A分成' },
  { date: '2026-03-22', type: '上游分成', amount: '4,338', remark: '上游B分成' },
  { date: '2026-03-21', type: '上游分成', amount: '5,472', remark: '上游A分成' },
  { date: '2026-03-20', type: '服务器费用', amount: '200', remark: '云服务器月费' },
])
</script>

<style scoped>
.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.stat-label { color: #888; font-size: 14px; margin-bottom: 10px; }
.stat-value { font-size: 24px; font-weight: bold; color: #333; }
</style>
