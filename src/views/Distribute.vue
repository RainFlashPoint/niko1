<template>
  <div class="distribute-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加分发规则</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="规则名称" />
      <el-table-column prop="upstreamName" label="上游" />
      <el-table-column prop="downstreamName" label="下游" />
      <el-table-column prop="price" label="单价">
        <template #default="{ row }">¥{{ row.price }}</template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-switch v-model="row.status" active-value="active" inactive-value="paused" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑分发规则' : '添加分发规则'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="规则名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="选择上游">
          <el-select v-model="form.upstreamId" style="width: 100%">
            <el-option v-for="u in upstreams" :key="u.id" :label="u.name" :value="u.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择下游">
          <el-select v-model="form.downstreamId" style="width: 100%">
            <el-option v-for="d in downstreams" :key="d.id" :label="d.clientName" :value="d.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="单价">
          <el-input-number v-model="form.price" :min="0" />
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number v-model="form.priority" :min="1" :max="100" />
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

const dialogVisible = ref(false)
const isEdit = ref(false)

const upstreams = ref([])
const downstreams = ref([])
const tableData = ref([])

const form = ref({ id: null, name: '', upstreamId: '', downstreamId: '', price: 100, priority: 1, status: 'active' })

onMounted(() => {
  // 加载上游和下游列表
  upstreams.value = readStorage('crm_upstreams') || []
  downstreams.value = readStorage('crm_downstreams') || []
  
  // 加载分发规则并关联名称
  const distributions = readStorage('crm_distributions') || []
  tableData.value = distributions.map(d => ({
    ...d,
    upstreamName: upstreams.value.find(u => u.id === d.upstreamId)?.name || d.upstreamId,
    downstreamName: downstreams.value.find(dn => dn.id === d.downstreamId)?.clientName || d.downstreamId
  }))
})

function handleAdd() {
  isEdit.value = false
  form.value = { id: null, name: '', upstreamId: upstreams.value[0]?.id || '', downstreamId: downstreams.value[0]?.id || '', price: 100, priority: 1, status: 'active' }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.name || !form.value.upstreamId || !form.value.downstreamId) {
    ElMessage.warning('请填写完整')
    return
  }
  
  const now = new Date().toISOString()
  const data = { ...form.value, updatedAt: now }
  
  if (isEdit.value) {
    const idx = tableData.value.findIndex(t => t.id === form.value.id)
    if (idx !== -1) {
      data.upstreamName = upstreams.value.find(u => u.id === data.upstreamId)?.name
      data.downstreamName = downstreams.value.find(d => d.id === data.downstreamId)?.clientName
      tableData.value[idx] = data
    }
  } else {
    data.id = createId()
    data.createdAt = now
    data.upstreamName = upstreams.value.find(u => u.id === data.upstreamId)?.name
    data.downstreamName = downstreams.value.find(d => d.id === data.downstreamId)?.clientName
    tableData.value.push(data)
  }
  
  // 保存到localStorage
  const saveData = tableData.value.map(({ upstreamName, downstreamName, ...rest }) => rest)
  saveStorage('crm_distributions', saveData)
  
  ElMessage.success('保存成功')
  dialogVisible.value = false
}

function handleDelete(row) {
  tableData.value = tableData.value.filter(t => t.id !== row.id)
  const saveData = tableData.value.map(({ upstreamName, downstreamName, ...rest }) => rest)
  saveStorage('crm_distributions', saveData)
  ElMessage.success('删除成功')
}
</script>

<style scoped>
.toolbar { display: flex; }
</style>
