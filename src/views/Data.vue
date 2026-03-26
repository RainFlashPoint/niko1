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
            <el-select v-model="channelFilter" placeholder="选择渠道" clearable style="width: 150px; margin-left: 10px">
              <el-option label="全部渠道" value="" />
              <el-option v-for="i in 10" :key="i" :label="`渠道${i}`" :value="`渠道${i}`" />
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
import { ref, reactive, onMounted } from 'vue'
import mockApi from '@/api/mock'

const tableData = ref([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const dateRange = ref([])
const channelFilter = ref('')

const getStatusType = (status) => {
  const map = { '成功': 'success', '失败': 'danger', '处理中': 'warning' }
  return map[status] || 'info'
}

const loadData = async () => {
  const res = await mockApi.getFlowData({
    page: pagination.page,
    pageSize: pagination.pageSize,
    startDate: dateRange.value?.[0],
    endDate: dateRange.value?.[1],
    channel: channelFilter.value
  })
  if (res.success) {
    tableData.value = res.data.list
    pagination.total = res.data.total
  }
}

onMounted(() => {
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