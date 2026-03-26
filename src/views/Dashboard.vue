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
          <div class="trend-list">
            <div v-for="(v, i) in flowTrendData" :key="i" class="trend-item">
              <span class="trend-date">{{ v.date }}</span>
              <div class="trend-bar-wrap">
                <div class="trend-bar" :style="{ width: v.percent + '%' }"></div>
              </div>
              <span class="trend-value">{{ v.value }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <h3>收入分布</h3>
          <div class="revenue-list">
            <div v-for="(item, i) in revenueDist" :key="i" class="revenue-item">
              <div class="revenue-info">
                <span class="legend-color" :style="{ background: item.color }"></span>
                <span>{{ item.name }}</span>
              </div>
              <span class="revenue-value">¥{{ item.value }}</span>
            </div>
            <div class="revenue-total">
              <span>合计</span>
              <span class="revenue-value">¥{{ totalRevenue }}</span>
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

const flowTrendData = ref([
  { date: '03-20', value: 1100, percent: 80 },
  { date: '03-21', value: 1200, percent: 90 },
  { date: '03-22', value: 1300, percent: 100 },
  { date: '03-23', value: 1250, percent: 95 },
  { date: '03-24', value: 1180, percent: 88 },
  { date: '03-25', value: 1256, percent: 96 },
  { date: '03-26', value: 1320, percent: 100 },
])

const revenueDist = ref([
  { name: 'CPA结算', value: '4,280', color: '#409EFF' },
  { name: 'UV结算', value: '2,560', color: '#67C23A' },
  { name: '其他', value: '1,720', color: '#E6A23C' }
])
const totalRevenue = computed(() => stats.value.todayRevenue.replace(',', ''))
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
.chart-card h3 { margin: 0 0 20px 0; color: #333; font-size: 16px; }

/* 趋势列表 */
.trend-list { display: flex; flex-direction: column; gap: 12px; }
.trend-item { display: flex; align-items: center; gap: 12px; }
.trend-date { width: 40px; font-size: 12px; color: #666; }
.trend-bar-wrap { flex: 1; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden; }
.trend-bar { height: 100%; background: linear-gradient(90deg, #409EFF, #67C23A); border-radius: 10px; transition: width 0.3s; }
.trend-value { width: 50px; text-align: right; font-size: 14px; font-weight: bold; color: #333; }

/* 收入列表 */
.revenue-list { display: flex; flex-direction: column; gap: 12px; }
.revenue-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f9f9f9; border-radius: 8px; }
.revenue-info { display: flex; align-items: center; gap: 8px; }
.legend-color { width: 12px; height: 12px; border-radius: 3px; }
.revenue-value { font-size: 16px; font-weight: bold; color: #333; }
.revenue-total { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: linear-gradient(135deg, #409EFF, #67C23A); border-radius: 8px; color: white; margin-top: 8px; }
.revenue-total .revenue-value { color: white; }
</style>
