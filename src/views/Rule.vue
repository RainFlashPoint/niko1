<template>
  <div class="rule-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>分发规则</span>
          <el-button type="primary" @click="handleAdd">新增规则</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="规则名称" />
        <el-table-column prop="strategy" label="分发策略" width="100">
          <template #default="{ row }">
            <el-tag :type="getStrategyType(row.strategy)">
              {{ row.strategy }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="targetChannels" label="目标渠道" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '启用' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        style="margin-top: 20px; justify-content: flex-end"
        @current-change="loadData"
        @size-change="loadData"
      />
    </el-card>
    
    <!-- 新增/编辑弹窗 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="isEdit ? '编辑规则' : '新增规则'" 
      width="500px"
    >
      <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px">
        <el-form-item label="规则名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入规则名称" />
        </el-form-item>
        <el-form-item label="匹配条件" prop="conditions">
          <el-input 
            v-model="form.conditions" 
            type="textarea" 
            :rows="3"
            placeholder='{"source": "xxx"}'
          />
        </el-form-item>
        <el-form-item label="分发策略" prop="strategy">
          <el-select v-model="form.strategy" placeholder="请选择分发策略">
            <el-option label="广播" value="广播" />
            <el-option label="权重" value="权重" />
            <el-option label="轮询" value="轮询" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标渠道" prop="targetChannels">
          <el-input v-model="form.targetChannels" placeholder="请输入目标渠道，多个用逗号分隔" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="启用" value="启用" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import mockApi from '@/api/mock'

const tableData = ref([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref()
const form = reactive({
  id: null,
  name: '',
  conditions: '',
  strategy: '',
  targetChannels: '',
  status: '启用'
})

const formRules = {
  name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  strategy: [{ required: true, message: '请选择分发策略', trigger: 'change' }],
  targetChannels: [{ required: true, message: '请输入目标渠道', trigger: 'blur' }]
}

const getStrategyType = (strategy) => {
  const map = { '广播': 'primary', '权重': 'success', '轮询': 'warning' }
  return map[strategy] || 'info'
}

const loadData = async () => {
  const res = await mockApi.getRules({
    page: pagination.page,
    pageSize: pagination.pageSize
  })
  if (res.success) {
    tableData.value = res.data.list
    pagination.total = res.data.total
  }
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, {
    id: null,
    name: '',
    conditions: '',
    strategy: '',
    targetChannels: '',
    status: '启用'
  })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  Object.assign(form, { ...row })
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该规则吗？', '提示', {
      type: 'warning'
    })
    const res = await mockApi.deleteRule(row.id)
    if (res.success) {
      ElMessage.success('删除成功')
      loadData()
    }
  } catch (e) {
    // 取消
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return
  
  const res = isEdit.value 
    ? await mockApi.updateRule(form.id, form)
    : await mockApi.addRule(form)
  
  if (res.success) {
    ElMessage.success(isEdit.value ? '更新成功' : '添加成功')
    dialogVisible.value = false
    loadData()
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.rule-page {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>