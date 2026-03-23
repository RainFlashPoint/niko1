<template>
  <div class="crm-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">+ 添加客户</el-button>
      <el-input v-model="search" placeholder="搜索客户名称/手机号..." style="width: 250px; margin-left: 10px" />
    </div>

    <el-table :data="filteredData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="客户名称" />
      <el-table-column prop="contact" label="联系人" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="type" label="客户类型">
        <template #default="{ row }">
          <el-tag>{{ row.type === 'upstream' ? '上游' : '下游' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="客户等级">
        <template #default="{ row }">
          <el-tag :type="row.level === 'A' ? 'danger' : row.level === 'B' ? 'warning' : 'info'">
            {{ row.level }}级
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'info'">
            {{ row.status === 'active' ? '正常' : '已流失' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" @click="viewRecord(row)">跟进</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑客户' : '添加客户'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="form.contact" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户类型">
              <el-select v-model="form.type" style="width: 100%">
                <el-option label="上游" value="upstream" />
                <el-option label="下游" value="downstream" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户等级">
              <el-select v-model="form.level" style="width: 100%">
                <el-option label="A级" value="A" />
                <el-option label="B级" value="B" />
                <el-option label="C级" value="C" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.status" style="width: 100%">
                <el-option label="正常" value="active" />
                <el-option label="已流失" value="inactive" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" rows="3" />
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
import { ElMessage, ElMessageBox } from 'element-plus'

const search = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)

const tableData = ref([
  { id: 1, name: '公司A', contact: '张三', phone: '13800138001', type: 'upstream', level: 'A', status: 'active', remark: '重要客户' },
  { id: 2, name: '公司B', contact: '李四', phone: '13800138002', type: 'downstream', level: 'B', status: 'active', remark: '' },
  { id: 3, name: '公司C', contact: '王五', phone: '13800138003', type: 'upstream', level: 'C', status: 'active', remark: '待跟进' },
  { id: 4, name: '公司D', contact: '赵六', phone: '13800138004', type: 'downstream', level: 'B', status: 'inactive', remark: '已流失' },
])

const form = ref({ id: null, name: '', contact: '', phone: '', type: 'downstream', level: 'C', status: 'active', remark: '' })

const filteredData = computed(() => {
  if (!search.value) return tableData.value
  const s = search.value.toLowerCase()
  return tableData.value.filter(d => 
    d.name.toLowerCase().includes(s) || d.phone.includes(s)
  )
})

function handleAdd() {
  isEdit.value = false
  form.value = { id: null, name: '', contact: '', phone: '', type: 'downstream', level: 'C', status: 'active', remark: '' }
  dialogVisible.value = true
}

function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSave() {
  if (!form.value.name || !form.value.phone) {
    ElMessage.warning('请填写完整信息')
    return
  }
  
  if (isEdit.value) {
    const idx = tableData.value.findIndex(d => d.id === form.value.id)
    if (idx !== -1) tableData.value[idx] = { ...form.value }
    ElMessage.success('保存成功')
  } else {
    form.value.id = Date.now()
    tableData.value.push({ ...form.value })
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
}

function handleDelete(row) {
  ElMessageBox.confirm(`确定删除客户 ${row.name} 吗?`, '提示', {
    type: 'warning'
  }).then(() => {
    tableData.value = tableData.value.filter(d => d.id !== row.id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}

function viewRecord(row) {
  ElMessage.info(`查看 ${row.name} 的跟进记录`)
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; }
</style>
