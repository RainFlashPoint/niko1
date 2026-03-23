<template>
  <div class="sales-page">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-card">
          <h3>销售趋势</h3>
          <div class="chart-placeholder">
            <div class="line-chart">
              <svg viewBox="0 0 400 150" class="chart-svg">
                <polyline 
                  fill="none" 
                  stroke="#409EFF" 
                  stroke-width="2"
                  points="0,120 50,100 100,80 150,90 200,60 250,40 300,50 350,30 400,20"
                />
                <circle cx="0" cy="120" r="3" fill="#409EFF" />
                <circle cx="50" cy="100" r="3" fill="#409EFF" />
                <circle cx="100" cy="80" r="3" fill="#409EFF" />
                <circle cx="150" cy="90" r="3" fill="#409EFF" />
                <circle cx="200" cy="60" r="3" fill="#409EFF" />
                <circle cx="250" cy="40" r="3" fill="#409EFF" />
                <circle cx="300" cy="50" r="3" fill="#409EFF" />
                <circle cx="350" cy="30" r="3" fill="#409EFF" />
                <circle cx="400" cy="20" r="3" fill="#409EFF" />
              </svg>
            </div>
            <div class="x-labels">
              <span>1月</span><span>2月</span><span>3月</span><span>4月</span><span>5月</span><span>6月</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <h3>销售排名</h3>
          <div class="ranking-list">
            <div v-for="(item, i) in ranking" :key="i" class="ranking-item">
              <span class="rank-num">{{ i + 1 }}</span>
              <span class="rank-name">{{ item.name }}</span>
              <span class="rank-value">¥{{ item.value }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const ranking = ref([
  { name: '张三', value: '125,680' },
  { name: '李四', value: '98,450' },
  { name: '王五', value: '76,320' },
  { name: '赵六', value: '54,210' },
])
</script>

<style scoped>
.chart-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
.chart-card h3 { margin-bottom: 20px; }
.chart-placeholder { min-height: 200px; }
.line-chart { height: 150px; }
.chart-svg { width: 100%; height: 100%; }
.x-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  padding: 10px 20px;
}
.ranking-list { padding: 10px 0; }
.ranking-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}
.rank-num {
  width: 24px;
  height: 24px;
  background: #409EFF;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 10px;
}
.rank-name { flex: 1; }
.rank-value { font-weight: bold; color: #67C23A; }
</style>
