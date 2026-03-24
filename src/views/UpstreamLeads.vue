<template>
  <div class="upstream-leads-page">
    <el-table :data="pageData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="channelName" label="上游渠道" width="140" />
      <el-table-column prop="channelCode" label="渠道编码" width="140" />
      <el-table-column prop="pushTime" label="推送时间" width="180" />
      <el-table-column prop="leadName" label="线索姓名" width="120" />
      <el-table-column prop="leadPhone" label="线索手机号" width="140" />
      <el-table-column prop="productName" label="产品名称" width="140" />
      <el-table-column prop="region" label="地域" width="120" />
      <el-table-column prop="status" label="状态" width="120" />
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { readStorage } from '../utils/storage'

const allData = ref([])
const pageSize = ref(10)
const currentPage = ref(1)

const total = computed(() => allData.value.length)
const maxPage = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

const pageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allData.value.slice(start, end)
})

function loadData() {
  const data = readStorage('upstream_leads') || []
  allData.value = Array.isArray(data) ? data : []
}

watch([total, pageSize], () => {
  if (currentPage.value > maxPage.value) {
    currentPage.value = maxPage.value
  }
})

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
