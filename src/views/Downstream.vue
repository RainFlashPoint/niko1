<template>
  <div class="downstream-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加下游</el-button>
      <el-input v-model="search" placeholder="搜索下游名称..." style="width: 200px; margin-left: 10px" />
    </div>

    <el-table :data="filteredData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="clientName" label="客户名称" />
      <el-table-column prop="contactPerson" label="联系人" />
      <el-table-column prop="contactPhone" label="联系电话" />
      <el-table-column prop="apiKey" label="API密钥" width="150">
        <template #default="{ row }">
          <span class="api-key">{{ row.apiKey.slice(0, 8) }}*** <el-button size="small" text @click="copyKey(row.apiKey)">复制</el-button></span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价">
        <template #default="{ row }">¥{{ row.price }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 'enabled' ? 'success' : 'danger'">
            {{ row.status === 'enabled' ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" :type="row.status === 'enabled' ? 'danger' : 'success'" @click="toggleStatus(row)">
            {{ row.status === 'enabled' ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑下游' : '添加下游'" width="600px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="客户名称" required>
          <el-input v-model="form.clientName" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contactPerson" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.contactPhone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="email" />
        </el-form-item>
        <el-form-item label="API密钥">
          <el-input v-model="form.apiKey" :disabled="isEdit">
            <template #append>
              <el-button @click="generateKey">生成</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="接收地址">
          <el-input v-model="form.feedUrl" placeholder="https://feed.example.com" />
        </el-form-item>
        <el-form-item label="计费模式">
          <el-select v-model="form.pricingModel" style="width: 100%">
            <el-option label="CPA" value="cpa" />
            <el-option label="CPS" value="cps" />
            <el-option label="固定" value="fixed" />
          </el-select>
        </el-form-item>
        <el-form-item label="单价">
          <el-input-number v-model="form.price" :min="0" />
        </el-form-item>
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
import { ElMessage } from 'element-plus'
import { readStorage, saveStorage, createId } from '../utils/storage'

const search = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)

const tableData = ref([])

const form = ref({
  id: null, clientName: '', contactPerson: '', contactPhone: '', email: '', 
  apiKey: '', feedUrl: '', pricingModel: 'cpa', price: 100, remark: '', status: 'enabled'
})

const filteredData = computed(() => {
  if (!search.value) return tableData.value
  return tableData.value.filter(d => d.clientName.includes(search.value))
})

function generateKey() {
  form.value.apiKey = 'ds_' + Math.random().toString(36).substr(2, 12)
}

function copyKey(key) {
  navigator.clipboard.writeText(key)
  ElMessage.success('已复制')
}

onMounted(() => {
  tableData.value = readStorage('crm_downstreams') || []
})

function handleAdd() {
  isEdit.value = false
  form.value = {
    id: null, clientName: '', contactPerson: '', contactPhone: '', email: '', 
    apiKey: '', feedUrl: '', pricingModel: 'cpa', price: 100, remark: '', status: 'enabled'
  }
  generateKey()
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.clientName) {
    ElMessage.warning('请输入客户名称')
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
  
  saveStorage('crm_downstreams', tableData.value)
  dialogVisible.value = false
}

function toggleStatus(row) {
  row.status = row.status === 'enabled' ? 'disabled' : 'enabled'
  row.updatedAt = new Date().toISOString()
  saveStorage('crm_downstreams', tableData.value)
  ElMessage.success(row.status === 'enabled' ? '已启用' : '已禁用')
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; }
.api-key { font-family: monospace; }
</style>
