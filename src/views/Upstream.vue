<template>
  <div class="upstream-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加上游</el-button>
      <el-input v-model="search" placeholder="搜索上游名称..." style="width: 200px; margin-left: 10px" />
    </div>

    <el-table :data="filteredData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="上游名称" />
      <el-table-column prop="platform" label="渠道平台" />
      <el-table-column prop="contact" label="联系人" />
      <el-table-column prop="contactPhone" label="联系电话" />
      <el-table-column prop="costPerLead" label="单条成本">
        <template #default="{ row }">
          ¥{{ row.costPerLead }}
        </template>
      </el-table-column>
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
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑上游' : '添加上游'" width="600px">
      <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="上游名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="渠道平台" prop="platform">
          <el-select v-model="form.platform" style="width: 100%">
            <el-option label="渠道A" value="渠道A" />
            <el-option label="渠道B" value="渠道B" />
            <el-option label="直客" value="直客" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" />
        </el-form-item>
        <el-form-item label="API地址" prop="apiEndpoint">
          <el-input v-model="form.apiEndpoint" placeholder="https://api.example.com" />
        </el-form-item>
        <el-form-item label="单条成本" prop="costPerLead">
          <el-input-number v-model="form.costPerLead" :min="0" />
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
const formRef = ref(null)

const tableData = ref([])

const rules = {
  name: [{ required: true, message: '请输入上游名称', trigger: 'blur' }],
  platform: [{ required: true, message: '请选择渠道平台', trigger: 'change' }],
  costPerLead: [{ required: true, message: '请输入单条成本', trigger: 'blur' }],
}

const form = ref({ 
  id: null, name: '', platform: '', contact: '', contactPhone: '', 
  apiEndpoint: '', costPerLead: 50, remark: '', status: 'active' 
})

const filteredData = computed(() => {
  if (!search.value) return tableData.value
  return tableData.value.filter(d => d.name.includes(search.value) || d.platform.includes(search.value))
})

onMounted(() => {
  loadData()
})

function loadData() {
  tableData.value = readStorage('crm_upstreams') || []
}

function handleAdd() {
  isEdit.value = false
  form.value = { 
    id: null, name: '', platform: '渠道A', contact: '', contactPhone: '', 
    apiEndpoint: '', costPerLead: 50, remark: '', status: 'active' 
  }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.name || !form.value.costPerLead) {
    ElMessage.warning('请填写必填项')
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
  
  saveStorage('crm_upstreams', tableData.value)
  dialogVisible.value = false
}

function toggleStatus(row) {
  row.status = row.status === 'active' ? 'inactive' : 'active'
  row.updatedAt = new Date().toISOString()
  saveStorage('crm_upstreams', tableData.value)
  ElMessage.success(row.status === 'active' ? '已启用' : '已禁用')
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; }
</style>
