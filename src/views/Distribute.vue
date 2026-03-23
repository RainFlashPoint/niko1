<template>
  <div class="distribute-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加分发规则</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="规则名称" />
      <el-table-column prop="upstream" label="上游" />
      <el-table-column prop="downstream" label="下游" />
      <el-table-column prop="flowRate" label="流量比例" />
      <el-table-column prop="priority" label="优先级" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-switch v-model="row.status" active-text="开启" inactive-text="关闭" />
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
          <el-select v-model="form.upstream" style="width: 100%">
            <el-option v-for="u in upstreams" :key="u" :label="u" :value="u" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择下游">
          <el-select v-model="form.downstream" style="width: 100%">
            <el-option v-for="d in downstreams" :key="d" :label="d" :value="d" />
          </el-select>
        </el-form-item>
        <el-form-item label="流量比例">
          <el-slider v-model="form.flowRate" :marks="{0: '0%', 50: '50%', 100: '100%'}" />
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
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const isEdit = ref(false)

const upstreams = ref(['上游A', '上游B', '上游C'])
const downstreams = ref(['下游A', '下游B', '下游C', '下游D'])

const tableData = ref([
  { id: 1, name: '规则1', upstream: '上游A', downstream: '下游A', flowRate: 80, priority: 1, status: true },
  { id: 2, name: '规则2', upstream: '上游B', downstream: '下游B', flowRate: 60, priority: 2, status: true },
  { id: 3, name: '规则3', upstream: '上游A', downstream: '下游C', flowRate: 50, priority: 3, status: false },
])

const form = ref({ id: null, name: '', upstream: '', downstream: '', flowRate: 50, priority: 1 })

function handleAdd() {
  isEdit.value = false
  form.value = { id: null, name: '', upstream: '', downstream: '', flowRate: 50, priority: 1 }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.name || !form.value.upstream || !form.value.downstream) {
    ElMessage.warning('请填写完整')
    return
  }
  if (isEdit.value) {
    const idx = tableData.value.findIndex(t => t.id === form.value.id)
    if (idx !== -1) tableData.value[idx] = { ...form.value }
  } else {
    form.value.id = Date.now()
    form.value.status = true
    tableData.value.push({ ...form.value })
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
}

function handleDelete(row) {
  tableData.value = tableData.value.filter(t => t.id !== row.id)
  ElMessage.success('删除成功')
}
</script>

<style scoped>
.toolbar { display: flex; }
</style>
