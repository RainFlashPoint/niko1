<template>
  <div class="report">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-card">
          <h3>流量统计趋势（入池量）</h3>
          <div ref="trendChart" class="chart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <h3>转化漏斗</h3>
          <div ref="funnelChart" class="chart"></div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <div class="chart-card">
          <h3>上下游对比</h3>
          <div ref="compareChart" class="chart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const trendChart = ref(null)
const funnelChart = ref(null)
const compareChart = ref(null)

onMounted(() => {
  // 流量趋势 - 入池量
  echarts.init(trendChart.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    legend: { data: ['入池量'], textStyle: { color: '#666' }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['03-20', '03-21', '03-22', '03-23', '03-24', '03-25', '03-26'],
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666' },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [
      { name: '入池量', type: 'line', data: [1100, 1200, 1300, 1250, 1180, 1256, 1320], itemStyle: { color: '#1890ff' }, areaStyle: { color: 'rgba(24,144,255,0.1)' } }
    ]
  })

  // 转化漏斗
  echarts.init(funnelChart.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    series: [{
      type: 'funnel',
      label: { color: '#666', position: 'inside' },
      data: [
        { value: 10000, name: '曝光', itemStyle: { color: '#1890ff' } },
        { value: 8000, name: '点击', itemStyle: { color: '#52c41a' } },
        { value: 4000, name: '注册', itemStyle: { color: '#faad14' } },
        { value: 2000, name: '申请', itemStyle: { color: '#fa8c16' } },
        { value: 820, name: '入池', itemStyle: { color: '#ff4d4f' } }
      ]
    }]
  })

  // 上下游对比
  echarts.init(compareChart.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['上游入池', '下游分发'], textStyle: { color: '#666' }, top: 0 },
    grid: { left: '3%', right: '4%', top: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['03-20', '03-21', '03-22', '03-23', '03-24', '03-25', '03-26'],
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666' },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [
      { name: '上游入池', type: 'bar', data: [1100, 1200, 1300, 1250, 1180, 1256, 1320], itemStyle: { color: '#1890ff' } },
      { name: '下游分发', type: 'bar', data: [1050, 1150, 1250, 1200, 1130, 1198, 1260], itemStyle: { color: '#52c41a' } }
    ]
  })
})
</script>

<style scoped>
.report {
  padding: 20px;
}

.chart-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  height: 350px;
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
