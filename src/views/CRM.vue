<template>
  <div class="crm-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加客户</el-button>
      <el-input v-model="search" placeholder="搜索客户名称/手机号..." style="width: 250px; margin-left: 10px" />
    </div>

    <el-table :data="filteredData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="客户名称" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="loanAmount" label="申请额度">
        <template #default="{ row }">¥{{ row.loanAmount?.toLocaleString() }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签">
        <template #default="{ row }">
          <el-tag v-for="tag in row.tags" :key="tag" size="small" style="margin-right: 4px">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑客户' : '添加客户'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="城市">
              <el-input v-model="form.city" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请额度">
              <el-input-number v-model="form.loanAmount" :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.status" style="width: 100%">
                <el-option label="新客户" value="new" />
                <el-option label="已联系" value="contacted" />
                <el-option label="已通过" value="approved" />
                <el-option label="已拒绝" value="rejected" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签">
              <el-select v-model="form.tags" multiple style="width: 100%">
                <el-option label="高意向" value="高意向" />
                <el-option label="低意向" value="低意向" />
                <el-option label="已成交" value="已成交" />
                <el-option label="待跟进" value="待跟进" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" rows="2" />
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
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { readStorage, saveStorage, createId } from '../utils/storage'

const search = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)

const tableData = ref([])

const form = ref({
  id: null, name: '', phone: '', city: '', loanAmount: 0, status: 'new', tags: [], remark: ''
})

const filteredData = computed(() => {
  if (!search.value) return tableData.value
  const s = search.value.toLowerCase()
  return tableData.value.filter(d => 
    d.name.toLowerCase().includes(s) || d.phone.includes(s)
  )
})

function getStatusType(status) {
  const types = { new: '', contacted: 'warning', approved: 'success', rejected: 'danger' }
  return types[status] || ''
}

function getStatusText(status) {
  const texts = { new: '新客户', contacted: '已联系', approved: '已通过', rejected: '已拒绝' }
  return texts[status] || status
}

onMounted(() => {
  tableData.value = readStorage('crm_customers') || []
})

function handleAdd() {
  isEdit.value = false
  form.value = { id: null, name: '', phone: '', city: '', loanAmount: 0, status: 'new', tags: [], remark: '' }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.name || !form.value.phone) {
    ElMessage.warning('请填写客户名称和手机号')
    return
  }
  
  const now = new Date().toISOString()
  
  if (isEdit.value) {
    const idx = tableData.value.findIndex(d => d.id === form.value.id)
    if (idx !== -1) {
      tableData.value[idx] = { ...form.value, updatedAt: now }
    }
    ElMessage.success('保存成功')
  } else {
    form.value.id = createId()
    form.value.createdAt = now
    form.value.updatedAt = now
    tableData.value.push({ ...form.value })
    ElMessage.success('添加成功')
  }
  
  saveStorage('crm_customers', tableData.value)
  dialogVisible.value = false
}

function handleDelete(row) {
  ElMessageBox.confirm(`确定删除客户 ${row.name} 吗?`, '提示', { type: 'warning' })
    .then(() => {
      tableData.value = tableData.value.filter(d => d.id !== row.id)
      saveStorage('crm_customers', tableData.value)
      ElMessage.success('删除成功')
    }).catch(() => {})
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; }
</style>
