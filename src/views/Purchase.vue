<template>
  <div class="purchase-page">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">采购总额</div>
          <div class="stat-value">¥{{ stats.total }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">本月采购</div>
          <div class="stat-value">¥{{ stats.month }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">待结算</div>
          <div class="stat-value" style="color: #E6A23C">¥{{ stats.pending }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-label">供应商数</div>
          <div class="stat-value">{{ stats.suppliers }}</div>
        </div>
      </el-col>
    </el-row>

    <div style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="采购日期" width="120" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column prop="product" label="采购产品" />
        <el-table-column prop="amount" label="金额">
          <template #default="{ row }">
            ¥{{ row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'paid' ? 'success' : row.status === 'pending' ? 'warning' : 'info'">
              {{ row.statusText }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref({
  total: '256,800',
  month: '45,600',
  pending: '12,300',
  suppliers: 8
})

const tableData = ref([
  { date: '2026-03-23', supplier: '供应商A', product: '流量包A', amount: '5,000', status: 'paid', statusText: '已结算' },
  { date: '2026-03-22', supplier: '供应商B', product: '流量包B', amount: '8,000', status: 'pending', statusText: '待结算' },
  { date: '2026-03-21', supplier: '供应商A', product: '流量包A', amount: '3,000', status: 'paid', statusText: '已结算' },
  { date: '2026-03-20', supplier: '供应商C', product: '流量包C', amount: '12,000', status: 'pending', statusText: '待结算' },
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
