<template>
  <div class="report">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-card">
          <h3>流量统计趋势</h3>
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

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="8">
        <div class="chart-card">
          <h3>渠道占比</h3>
          <div ref="pieChart1" class="chart"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-card">
          <h3>客户占比</h3>
          <div ref="pieChart2" class="chart"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-card">
          <h3>区域分布</h3>
          <div ref="pieChart3" class="chart"></div>
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
const pieChart1 = ref(null)
const pieChart2 = ref(null)
const pieChart3 = ref(null)

onMounted(() => {
  echarts.init(trendChart.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    legend: { data: ['采购流量', '销售流量'], textStyle: { color: '#666' }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
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
      { name: '采购流量', type: 'bar', data: [32000, 35000, 38000, 42000, 40000, 45000, 48000], itemStyle: { color: '#1890ff' } },
      { name: '销售流量', type: 'bar', data: [25000, 28000, 30000, 35000, 33000, 38000, 40000], itemStyle: { color: '#52c41a' } }
    ]
  })

  echarts.init(funnelChart.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    series: [{
      type: 'funnel',
      label: { color: '#666' },
      data: [
        { value: 10000, name: '曝光', itemStyle: { color: '#1890ff' } },
        { value: 8000, name: '点击', itemStyle: { color: '#52c41a' } },
        { value: 4000, name: '注册', itemStyle: { color: '#faad14' } },
        { value: 2000, name: '申请', itemStyle: { color: '#fa8c16' } },
        { value: 820, name: '放款', itemStyle: { color: '#ff4d4f' } }
      ]
    }]
  })

  echarts.init(compareChart.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['采购成本', '销售收入', '利润'], textStyle: { color: '#666' }, top: 0 },
    grid: { left: '3%', right: '4%', top: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#666', formatter: '¥{value}' },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [
      { name: '采购成本', type: 'bar', stack: 'total', data: [80000, 85000, 90000, 95000, 88000, 92000], itemStyle: { color: '#ff4d4f' } },
      { name: '销售收入', type: 'bar', stack: 'total', data: [120000, 135000, 145000, 160000, 150000, 165000], itemStyle: { color: '#52c41a' } },
      { name: '利润', type: 'line', data: [40000, 50000, 55000, 65000, 62000, 73000], itemStyle: { color: '#faad14' }, lineStyle: { color: '#faad14' } }
    ]
  })

  echarts.init(pieChart1.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '70%',
      label: { color: '#666' },
      data: [
        { value: 35, name: '渠道A', itemStyle: { color: '#1890ff' } },
        { value: 28, name: '渠道B', itemStyle: { color: '#52c41a' } },
        { value: 20, name: '渠道C', itemStyle: { color: '#faad14' } },
        { value: 17, name: '其他', itemStyle: { color: '#ff4d4f' } }
      ]
    }]
  })

  echarts.init(pieChart2.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '70%',
      label: { color: '#666' },
      data: [
        { value: 45, name: '客户张三', itemStyle: { color: '#1890ff' } },
        { value: 30, name: '客户李四', itemStyle: { color: '#52c41a' } },
        { value: 25, name: '其他', itemStyle: { color: '#faad14' } }
      ]
    }]
  })

  echarts.init(pieChart3.value).setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '70%',
      label: { color: '#666' },
      data: [
        { value: 30, name: '北京', itemStyle: { color: '#1890ff' } },
        { value: 25, name: '上海', itemStyle: { color: '#52c41a' } },
        { value: 20, name: '深圳', itemStyle: { color: '#faad14' } },
        { value: 15, name: '广州', itemStyle: { color: '#ff4d4f' } },
        { value: 10, name: '其他', itemStyle: { color: '#8c8c8c' } }
      ]
    }]
  })
})
</script>

<style scoped>
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
