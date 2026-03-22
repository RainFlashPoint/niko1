<template>
  <div class="product">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>贷款产品列表</span>
          <el-button type="primary" size="small">+ 添加产品</el-button>
        </div>
      </template>
      <el-table :data="products" style="width: 100%">
        <el-table-column prop="id" label="产品ID" width="100" />
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="type" label="产品类型" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="minAmount" label="最低金额" width="100" />
        <el-table-column prop="maxAmount" label="最高金额" width="100" />
        <el-table-column prop="rate" label="利率范围" width="120" />
        <el-table-column prop="term" label="期限" width="100" />
        <el-table-column prop="target" label="目标用户" width="120" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '上架' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>产品费率配置</span>
      </template>
      <el-table :data="rates" style="width: 100%">
        <el-table-column prop="product" label="产品" width="150" />
        <el-table-column prop="term" label="期限" width="100" />
        <el-table-column prop="rate" label="年化利率" width="100" />
        <el-table-column prop="serviceFee" label="服务费" width="100" />
        <el-table-column prop="管理费" label="管理费" width="100" />
        <el-table-column prop="逾期利率" label="逾期利率" width="100" />
        <el-table-column label="操作" width="80">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <div class="chart-card">
          <h3>产品申请量分布</h3>
          <div ref="chart1" class="chart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <h3>产品通过率对比</h3>
          <div ref="chart2" class="chart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const products = ref([
  { id: 'P001', name: '闪电贷', type: '消费贷', minAmount: '1,000', maxAmount: '50,000', rate: '8.8%-15%', term: '3-12期', target: '白领', status: '上架' },
  { id: 'P002', name: '消费分期', type: '消费分期', minAmount: '3,000', maxAmount: '30,000', rate: '0-12%', term: '6-24期', target: '年轻人', status: '上架' },
  { id: 'P003', name: '企业贷', type: '经营贷', minAmount: '50,000', maxAmount: '500,000', rate: '6%-12%', term: '12-36期', target: '企业主', status: '上架' },
  { id: 'P004', name: '信用卡代还', type: '信用卡', minAmount: '5,000', maxAmount: '20,000', rate: '15%-18%', term: '3-12期', target: '持卡人', status: '下架' },
])

const rates = ref([
  { product: '闪电贷', term: '3期', rate: '15%', serviceFee: '2%', 管理费: '0.5%', 逾期利率: '0.05%/天' },
  { product: '闪电贷', term: '6期', rate: '12%', serviceFee: '2%', 管理费: '0.5%', 逾期利率: '0.05%/天' },
  { product: '闪电贷', term: '12期', rate: '8.8%', serviceFee: '2%', 管理费: '0.5%', 逾期利率: '0.05%/天' },
  { product: '消费分期', term: '6期', rate: '0%', serviceFee: '3%', 管理费: '0.8%', 逾期利率: '0.05%/天' },
  { product: '消费分期', term: '12期', rate: '0%', serviceFee: '5%', 管理费: '0.8%', 逾期利率: '0.05%/天' },
])

const chart1 = ref(null)
const chart2 = ref(null)

onMounted(() => {
  echarts.init(chart1.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '60%',
      data: [
        { value: 35, name: '闪电贷', itemStyle: { color: '#1890ff' } },
        { value: 28, name: '消费分期', itemStyle: { color: '#52c41a' } },
        { value: 20, name: '企业贷', itemStyle: { color: '#faad14' } },
        { value: 17, name: '其他', itemStyle: { color: '#722ed1' } }
      ]
    }]
  })

  echarts.init(chart2.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['闪电贷', '消费分期', '企业贷', '信用卡代还'],
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666', formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [{
      type: 'bar',
      data: [68.5, 72.3, 55.2, 45.8],
      itemStyle: { color: '#1890ff' }
    }]
  })
})
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

.chart-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.chart-card h3 {
  color: #333;
  margin: 0 0 16px 0;
  font-size: 16px;
}

.chart {
  height: 280px;
}
</style>
