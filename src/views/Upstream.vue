<template>
  <div class="upstream-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加上游</el-button>
      <el-input v-model="search" placeholder="搜索上游名称..." style="width: 200px; margin-left: 10px" />
    </div>

    <el-table :data="filteredData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="上游名称" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="rate" label="分成比例">
        <template #default="{ row }">
          {{ row.rate }}%
        </template>
      </el-table-column>
      <el-table-column prop="dailyLimit" label="日限额" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === 'active' ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" :type="row.status === 'active' ? 'danger' : 'success'" @click="toggleStatus(row)">
            {{ row.status === 'active' ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑上游' : '添加上游'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="上游名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" style="width: 100%">
            <el-option label="渠道A" value="channel_a" />
            <el-option label="渠道B" value="channel_b" />
            <el-option label="直客" value="direct" />
          </el-select>
        </el-form-item>
        <el-form-item label="分成比例">
          <el-input-number v-model="form.rate" :min="0" :max="100" />
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
  { id: 1, name: '上游A', type: '渠道A', rate: 70, dailyLimit: '10万', status: 'active' },
  { id: 2, name: '上游B', type: '渠道B', rate: 65, dailyLimit: '5万', status: 'active' },
  { id: 3, name: '上游C', type: '直客', rate: 80, dailyLimit: '8万', status: 'active' },
  { id: 4, name: '上游D', type: '渠道A', rate: 60, dailyLimit: '3万', status: 'inactive' },
])

const form = ref({ id: null, name: '', type: '', rate: 70, dailyLimit: '' })

const filteredData = computed(() => {
  if (!search.value) return tableData.value
  return tableData.value.filter(d => d.name.includes(search.value))
})

function handleAdd() {
  isEdit.value = false
  form.value = { id: null, name: '', type: 'channel_a', rate: 70, dailyLimit: '' }
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

function toggleStatus(row) {
  row.status = row.status === 'active' ? 'inactive' : 'active'
  ElMessage.success(row.status === 'active' ? '已启用' : '已禁用')
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; }
</style>
