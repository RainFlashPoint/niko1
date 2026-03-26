<template>
  <div class="data-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>上游流量</span>
          <div class="header-actions">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
              style="width: 240px"
            />
            <el-select v-model="channelFilter" placeholder="选择渠道" clearable style="width: 200px; margin-left: 10px">
              <el-option-group v-for="group in channelOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.channelCode" :label="`${item.channelName} (${item.channelCode})`" :value="item.channelName" />
              </el-option-group>
            </el-select>
            <el-button type="primary" style="margin-left: 10px" @click="loadData">查询</el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="id" label="数据ID" width="100" />
        <el-table-column prop="upstreamChannel" label="上游渠道" />
        <el-table-column prop="downstreamChannel" label="下游渠道" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="data" label="数据内容" min-width="200">
          <template #default="{ row }">
            <span style="font-size: 12px; color: #909399">{{ row.data }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
      </el-table>
      
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        style="margin-top: 20px; justify-content: flex-end"
        @current-change="loadData"
        @size-change="loadData"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { readStorage } from '../utils/storage'

const tableData = ref([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const dateRange = ref([])
const channelFilter = ref('')

// 获取上游和下游渠道
const upstreams = ref([])
const downstreams = ref([])

const channelOptions = computed(() => [
  {
    label: '上游渠道',
    options: upstreams.value
  },
  {
    label: '下游渠道',
    options: downstreams.value
  }
])

const getStatusType = (status) => {
  const map = { '已入池': 'success', '入池中': 'warning' }
  return map[status] || 'info'
}

// 模拟数据生成 - 从真实渠道中选择
const generateMockData = () => {
  const list = []
  const statuses = ['已入池', '入池中']
  
  for (let i = 0; i < 50; i++) {
    const upstream = upstreams.value[Math.floor(Math.random() * upstreams.value.length)]
    const downstream = downstreams.value[Math.floor(Math.random() * downstreams.value.length)]
    
    list.push({
      id: 1001 + i,
      upstreamChannel: upstream ? `${upstream.channelName} (${upstream.channelCode})` : '未知',
      downstreamChannel: downstream ? `${downstream.channelName} (${downstream.channelCode})` : '未知',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      data: `{"phone": "138****${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}", "name": "用户${i+1}"}`,
      createTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19)
    })
  }
  
  return list
}

const allData = ref([])

const loadData = () => {
  // 从上游/下游渠道筛选
  let filtered = allData.value
  if (channelFilter.value) {
    filtered = filtered.filter(d => d.upstreamChannel.includes(channelFilter.value) || d.downstreamChannel.includes(channelFilter.value))
  }
  
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  tableData.value = filtered.slice(start, end)
  pagination.total = filtered.length
}

onMounted(() => {
  upstreams.value = readStorage('crm_upstreams') || []
  downstreams.value = readStorage('crm_downstreams') || []
  
  // 生成模拟数据
  allData.value = generateMockData()
  loadData()
})
</script>

<style scoped>
.data-page {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
}
</style>
