<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="8">
        <div class="stat-card">
          <div class="stat-icon">📥</div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.todayFlow }}</div>
            <div class="stat-label">今日入池量</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.pushSuccess }}</div>
            <div class="stat-label">推送成功总量</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <div class="stat-value">¥{{ stats.todayRevenue }}</div>
            <div class="stat-label">今日收入</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <div class="chart-card">
          <h3>流量趋势(最近7天)</h3>
          <div class="chart-placeholder">
            <div class="bar-chart">
              <div v-for="(v, i) in flowTrend" :key="i" class="bar" :style="{ height: v + '%' }">
                <span class="bar-label">{{ v }}%</span>
              </div>
            </div>
            <div class="bar-x-axis">
              <span v-for="(d, i) in flowDates" :key="i">{{ d }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <h3>收入分布</h3>
          <div class="chart-placeholder">
            <div class="pie-chart">
              <div class="pie-center">¥{{ totalRevenue }}</div>
            </div>
            <div class="pie-legend">
              <div v-for="(item, i) in revenueDist" :key="i" class="legend-item">
                <span class="legend-color" :style="{ background: item.color }"></span>
                <span>{{ item.name }}</span>
                <span class="legend-value">¥{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stats = ref({
  todayFlow: '1,256',
  pushSuccess: '1,198',
  todayRevenue: '8,560'
})

const flowTrend = ref([65, 78, 90, 85, 95, 88, 82])
const flowDates = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])

const revenueDist = ref([
  { name: '上游分成', value: '4,280', color: '#409EFF' },
  { name: '下游分成', value: '2,560', color: '#67C23A' },
  { name: '服务费', value: '1,720', color: '#E6A23C' }
])
const totalRevenue = computed(() => stats.value.todayRevenue.replace(',', ''))

const recentOrders = ref([
  { orderNo: 'ORD20260323001', user: '张三', product: '流量包A', amount: 100, status: 'paid', statusText: '已支付', createdAt: '2026-03-23 14:30' },
  { orderNo: 'ORD20260323002', user: '李四', product: '流量包B', amount: 200, status: 'pending', statusText: '待支付', createdAt: '2026-03-23 13:20' },
  { orderNo: 'ORD20260323003', user: '王五', product: '流量包A', amount: 100, status: 'completed', statusText: '已完成', createdAt: '2026-03-23 12:15' },
  { orderNo: 'ORD20260323004', user: '赵六', product: '流量包C', amount: 500, status: 'paid', statusText: '已支付', createdAt: '2026-03-23 11:00' },
])

function getStatusType(status) {
  const types = { paid: 'success', pending: 'warning', completed: 'info', failed: 'danger' }
  return types[status] || 'info'
}
</script>

<style scoped>
.stats-row { margin: -10px; }
.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.stat-icon { font-size: 32px; }
.stat-value { font-size: 24px; font-weight: bold; color: #333; }
.stat-label { font-size: 12px; color: #888; }
.chart-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.chart-card h3 { margin-bottom: 20px; color: #333; }
.chart-placeholder { min-height: 200px; }

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 180px;
  padding: 10px 0;
}
.bar {
  width: 40px;
  background: linear-gradient(to top, #409EFF, #66B1FF);
  border-radius: 4px 4px 0 0;
  position: relative;
}
.bar-label {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #666;
}
.bar-x-axis {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  font-size: 12px;
  color: #888;
}

.pie-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(#409EFF 0% 40%, #67C23A 40% 65%, #E6A23C 65% 100%);
  margin: 0 auto;
  position: relative;
}
.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.pie-legend { margin-top: 20px; }
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 12px;
}
.legend-color { width: 12px; height: 12px; border-radius: 2px; }
.legend-value { margin-left: auto; font-weight: bold; }
</style>
