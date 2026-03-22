<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日信息</div>
          <div class="stat-value" style="color: #1890ff;">423</div>
          <div class="stat-change">↑ 12.5%</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">已分发</div>
          <div class="stat-value" style="color: #52c41a;">1,267</div>
          <div class="stat-change">↑ 8.2%</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日收入</div>
          <div class="stat-value" style="color: #faad14;">¥2,845</div>
          <div class="stat-change">↑ 5.2%</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日支出</div>
          <div class="stat-value" style="color: #ff4d4f;">¥1,520</div>
          <div class="stat-change down">↑ 3.1%</div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="16">
        <el-card>
          <template #header>
            <span>流量趋势</span>
          </template>
          <div ref="trendChart" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>上下游分布</span>
          </template>
          <div ref="pieChart" class="chart"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <span>实时 API 调用</span>
      </template>
      <el-table :data="realtime" style="width: 100%">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '上行' ? 'success' : 'warning'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源/客户" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag type="success">成功</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const realtime = ref([
  { time: '14:32:15', type: '上行', source: '渠道A', phone: '138****1234', status: '成功' },
  { time: '14:31:42', type: '下行', source: '客户张三', phone: '139****5678', status: '成功' },
  { time: '14:30:58', type: '上行', source: '渠道B', phone: '137****9012', status: '成功' },
  { time: '14:29:33', type: '下行', source: '客户李四', phone: '136****3456', status: '成功' },
  { time: '14:28:17', type: '上行', source: '渠道C', phone: '135****7890', status: '成功' },
])

const trendChart = ref(null)
const pieChart = ref(null)

onMounted(() => {
  echarts.init(trendChart.value).setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['上行', '下行'], bottom: 0, textStyle: { color: '#666' } },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
      { name: '上行', type: 'line', smooth: true, data: [120, 140, 110, 160, 180, 210, 240], lineStyle: { color: '#52c41a' }, itemStyle: { color: '#52c41a' } },
      { name: '下行', type: 'line', smooth: true, data: [80, 100, 90, 120, 140, 160, 180], lineStyle: { color: '#faad14' }, itemStyle: { color: '#faad14' } }
    ]
  })

  echarts.init(pieChart.value).setOption({
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 35, name: '上行', itemStyle: { color: '#52c41a' } },
        { value: 28, name: '下行', itemStyle: { color: '#faad14' } }
      ]
    }]
  })
})
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

.stat-change {
  font-size: 12px;
  color: #52c41a;
  margin-top: 4px;
}

.stat-change.down {
  color: #ff4d4f;
}

.chart {
  height: 280px;
}
</style>
