<template>
  <div class="landing-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 创建落地页</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="页面名称" />
      <el-table-column prop="url" label="访问地址" />
      <el-table-column prop="views" label="访问量" />
      <el-table-column prop="converts" label="转化数" />
      <el-table-column prop="converts" label="转化率">
        <template #default="{ row }">
          {{ ((row.converts / row.views) * 100).toFixed(1) }}%
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-switch v-model="row.status" active-text="上线" inactive-text="下线" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" @click="copyUrl(row)">复制链接</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: 1, name: '流量包A推广页', url: 'https://example.com/lp/1', views: 1250, converts: 85, status: true },
  { id: 2, name: '流量包B推广页', url: 'https://example.com/lp/2', views: 980, converts: 62, status: true },
  { id: 3, name: '企业定制页面', url: 'https://example.com/lp/3', views: 320, converts: 28, status: false },
])

function handleAdd() {
  ElMessage.info('创建落地页')
}

function handleEdit(row) {
  ElMessage.info(`编辑 ${row.name}`)
}

function copyUrl(row) {
  navigator.clipboard.writeText(row.url)
  ElMessage.success('链接已复制')
}
</script>

<style scoped>
.toolbar { display: flex; }
</style>
