<template>
  <div class="downstream-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加下游</el-button>
      <el-input v-model="search" placeholder="搜索下游名称..." style="width: 200px; margin-left: 10px" />
    </div>

    <el-table :data="filteredData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="下游名称" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="apiKey" label="API密钥" width="150" />
      <el-table-column prop="dailyLimit" label="日限额" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === 'active' ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" @click="viewStats(row)">统计</el-button>
          <el-button size="small" :type="row.status === 'active' ? 'danger' : 'success'" @click="toggleStatus(row)">
            {{ row.status === 'active' ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑下游' : '添加下游'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="下游名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" style="width: 100%">
            <el-option label="代理" value="agent" />
            <el-option label="直客" value="direct" />
          </el-select>
        </el-form-item>
        <el-form-item label="API密钥">
          <el-input v-model="form.apiKey" :disabled="isEdit">
            <template #append>
              <el-button @click="generateKey">生成</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="日限额">
          <el-input v-model="form.dailyLimit" />
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
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const search = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)

const tableData = ref([
  { id: 1, name: '下游A', type: '代理', apiKey: 'ds_abc123***', dailyLimit: '5万', status: 'active' },
  { id: 2, name: '下游B', type: '直客', apiKey: 'ds_def456***', dailyLimit: '10万', status: 'active' },
  { id: 3, name: '下游C', type: '代理', apiKey: 'ds_ghi789***', dailyLimit: '3万', status: 'active' },
  { id: 4, name: '下游D', type: '直客', apiKey: 'ds_jkl012***', dailyLimit: '8万', status: 'inactive' },
])

const form = ref({ id: null, name: '', type: '', apiKey: '', dailyLimit: '' })

const filteredData = computed(() => {
  if (!search.value) return tableData.value
  return tableData.value.filter(d => d.name.includes(search.value))
})

function generateKey() {
  form.value.apiKey = 'ds_' + Math.random().toString(36).substr(2, 9)
}

function handleAdd() {
  isEdit.value = false
  form.value = { id: null, name: '', type: 'agent', apiKey: '', dailyLimit: '' }
  generateKey()
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.name) {
    ElMessage.warning('请输入名称')
    return
  }
  if (!form.value.apiKey) {
    ElMessage.warning('请生成API密钥')
    return
  }
  
  if (isEdit.value) {
    const idx = tableData.value.findIndex(d => d.id === form.value.id)
    if (idx !== -1) tableData.value[idx] = { ...form.value }
    ElMessage.success('保存成功')
  } else {
    form.value.id = Date.now()
    form.value.status = 'active'
    tableData.value.push({ ...form.value })
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
}

function viewStats(row) {
  ElMessage.info(`查看 ${row.name} 的统计数据`)
}

function toggleStatus(row) {
  row.status = row.status === 'active' ? 'inactive' : 'active'
  ElMessage.success(row.status === 'active' ? '已启用' : '已禁用')
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; }
</style>
