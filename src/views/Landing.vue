<template>
  <div class="landing-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 创建落地页</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="页面名称" />
      <el-table-column prop="path" label="访问路径">
        <template #default="{ row }">
          <span class="path-text">/{{ row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="views" label="访问量" />
      <el-table-column prop="converts" label="转化数" />
      <el-table-column prop="converts" label="转化率">
        <template #default="{ row }">
          {{ row.views > 0 ? ((row.converts / row.views) * 100).toFixed(1) : 0 }}%
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'info'">
            {{ row.status ? '上线' : '下线' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-switch v-model="row.status" @change="handleStatusChange(row)" style="margin-right: 8px" />
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" @click="copyUrl(row)">复制链接</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑落地页' : '创建落地页'" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="页面名称" required>
          <el-input v-model="form.name" placeholder="例如：流量包A推广页" />
        </el-form-item>
        <el-form-item label="访问路径" required>
          <el-input v-model="form.path" placeholder="例如：liuliang-a" />
          <div class="form-tip">最终访问地址：{{ baseUrl }}/{{ form.path }}</div>
        </el-form-item>
        <el-form-item label="页面标题">
          <el-input v-model="form.title" placeholder="页面显示的标题" />
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="form.productName" placeholder="例如：信用贷" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { readStorage, saveStorage, createId } from '../utils/storage'

const baseUrl = 'https://still-surf-b2be.pages.dev'

const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)

const form = ref({
  id: null,
  name: '',
  path: '',
  title: '',
  productName: '',
  status: true,
  views: 0,
  converts: 0
})

onMounted(() => {
  loadData()
})

function loadData() {
  const data = readStorage('crm_landing_pages')
  if (data && data.length > 0) {
    tableData.value = data
  } else {
    // 默认数据
    tableData.value = [
      { id: 'lp1', name: '流量包A推广页', path: 'liuliang-a', title: '信用贷款', productName: '信用贷', views: 1250, converts: 85, status: true },
      { id: 'lp2', name: '流量包B推广页', path: 'liuliang-b', title: '车贷服务', productName: '车贷', views: 980, converts: 62, status: true },
      { id: 'lp3', name: '企业定制页面', path: 'qiye', title: '企业贷款', productName: '企业贷', views: 320, converts: 28, status: false },
    ]
    saveStorage('crm_landing_pages', tableData.value)
  }
}

function handleAdd() {
  isEdit.value = false
  form.value = {
    id: null,
    name: '',
    path: '',
    title: '',
    productName: '',
    status: true,
    views: 0,
    converts: 0
  }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.name || !form.value.path) {
    ElMessage.warning('请填写页面名称和访问路径')
    return
  }
  
  // 检查路径是否重复
  const exists = tableData.value.find(d => d.path === form.value.path && d.id !== form.value.id)
  if (exists) {
    ElMessage.error('访问路径已存在')
    return
  }
  
  if (isEdit.value) {
    const idx = tableData.value.findIndex(d => d.id === form.value.id)
    if (idx !== -1) {
      tableData.value[idx] = { ...form.value }
    }
    ElMessage.success('保存成功')
  } else {
    form.value.id = createId()
    tableData.value.push({ ...form.value })
    ElMessage.success('创建成功')
  }
  
  saveStorage('crm_landing_pages', tableData.value)
  dialogVisible.value = false
}

function handleStatusChange(row) {
  saveStorage('crm_landing_pages', tableData.value)
  ElMessage.success(row.status ? '已上线' : '已下线')
}

function copyUrl(row) {
  // 使用查询参数方式，支持任意部署域名
  const url = `${baseUrl}/landing.html?path=${row.path}`
  navigator.clipboard.writeText(url)
  ElMessage.success('链接已复制: ' + url)
}
</script>

<style scoped>
.toolbar { display: flex; }
.path-text { 
  font-family: monospace; 
  background: #f5f7fa; 
  padding: 2px 8px; 
  border-radius: 4px; 
}
.form-tip { 
  font-size: 12px; 
  color: #909399; 
  margin-top: 4px; 
}
</style>
