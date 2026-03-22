<template>
  <div class="finance">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">本月收入</div>
          <div class="stat-value" style="color: #52c41a;">¥28,540</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">本月支出</div>
          <div class="stat-value" style="color: #ff4d4f;">¥12,400</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">本月利润</div>
          <div class="stat-value" style="color: #1890ff;">¥16,140</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">毛利率</div>
          <div class="stat-value" style="color: #722ed1;">56.5%</div>
        </div>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <span>收入明细（信息销售）</span>
      </template>
      <el-table :data="income" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="customer" label="客户" width="150" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="price" label="单价" width="80" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="{ row }">
            <span style="color: #52c41a;">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已回款' ? 'success' : 'warning'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-top: 20px;">
      <template #header>
        <span>支出明细（信息采购）</span>
      </template>
      <el-table :data="expense" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="channel" label="渠道" width="150" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="price" label="单价" width="80" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="{ row }">
            <span style="color: #ff4d4f;">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default>
            <el-tag type="success">已结算</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const income = ref([
  { date: '2024-01-15', customer: '客户张三', quantity: 156, price: 15, amount: '2,340', status: '已回款' },
  { date: '2024-01-15', customer: '客户李四', quantity: 78, price: 12, amount: '936', status: '待回款' },
  { date: '2024-01-14', customer: '客户张三', quantity: 120, price: 15, amount: '1,800', status: '已回款' },
])

const expense = ref([
  { date: '2024-01-15', channel: '渠道A', quantity: 200, price: 5, amount: '1,000', status: '已结算' },
  { date: '2024-01-15', channel: '渠道B', quantity: 150, price: 8, amount: '1,200', status: '已结算' },
  { date: '2024-01-14', channel: '渠道A', quantity: 180, price: 5, amount: '900', status: '已结算' },
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
</style>
