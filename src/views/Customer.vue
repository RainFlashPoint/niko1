<template>
  <div class="customer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>客户列表</span>
          <div>
            <el-input placeholder="搜索手机号/姓名" style="width: 200px;" />
            <el-button type="primary" size="small" style="margin-left: 10px;">+ 添加客户</el-button>
          </div>
        </div>
      </template>
      <el-table :data="customers" style="width: 100%">
        <el-table-column prop="id" label="客户ID" width="100" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="type" label="客户类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '企业' ? 'success' : 'info'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="客户等级" width="100">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="200">
          <template #default="{ row }">
            <el-tag v-for="tag in row.tags" :key="tag" size="small" style="margin-right: 5px;">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="applyCount" label="申请次数" width="100" />
        <el-table-column prop="loanCount" label="放款次数" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '活跃' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
            <el-button link type="primary" size="small">跟进</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>跟进记录</span>
      </template>
      <el-timeline>
        <el-timeline-item v-for="(item, index) in timeline" :key="index" :timestamp="item.timestamp" placement="top">
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
            <p style="color: #999; font-size: 12px;">跟进人：{{ item.operator }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <span>客户标签管理</span>
      </template>
      <div class="tags">
        <el-tag v-for="tag in tagOptions" :key="tag.name" :type="tag.type" closable>{{ tag.name }}</el-tag>
        <el-button size="small" type="primary" link>+ 添加标签</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customers = ref([
  { id: 'C001', name: '张三', phone: '138****1234', type: '个人', level: 'A', tags: ['优质', '高收入'], applyCount: 5, loanCount: 3, status: '活跃' },
  { id: 'C002', name: '李四', phone: '139****5678', type: '个人', level: 'B', tags: ['白领'], applyCount: 3, loanCount: 2, status: '活跃' },
  { id: 'C003', name: '王五公司', phone: '137****9012', type: '企业', level: 'A', tags: ['优质', '大型企业'], applyCount: 8, loanCount: 5, status: '活跃' },
  { id: 'C004', name: '赵六', phone: '136****3456', type: '个人', level: 'C', tags: ['逾期'], applyCount: 2, loanCount: 1, status: '沉默' },
])

const timeline = ref([
  { timestamp: '2024-01-15 14:30', title: '电话跟进', content: '客户表示有贷款意向，需要10万流动资金', operator: '业务员A' },
  { timestamp: '2024-01-14 10:15', title: '客户申请', content: '客户提交了企业贷申请，金额50万', operator: '系统' },
  { timestamp: '2024-01-13 16:20', title: '标签更新', content: '添加标签：优质客户', operator: '业务员B' },
  { timestamp: '2024-01-12 09:00', title: '客户注册', content: '新客户注册，信息完善', operator: '系统' },
])

const tagOptions = ref([
  { name: '优质', type: 'success' },
  { name: '高收入', type: 'success' },
  { name: '白领', type: 'info' },
  { name: '企业主', type: 'warning' },
  { name: '逾期', type: 'danger' },
  { name: '沉默', type: 'info' },
  { name: '大型企业', type: 'success' },
])

const getLevelType = (level) => {
  const map = { 'A': 'success', 'B': 'warning', 'C': 'danger' }
  return map[level] || 'info'
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
}

:deep(.el-card__header) {
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

:deep(.el-card__body) {
  background: #ffffff;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

h4 {
  margin: 0 0 10px 0;
  color: #333;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>
