<template>
  <div class="leads">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">总线索</div>
          <div class="stat-value" style="color: #1890ff;">12,456</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">待分发</div>
          <div class="stat-value" style="color: #faad14;">156</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">已分发</div>
          <div class="stat-value" style="color: #52c41a;">8,234</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日新增</div>
          <div class="stat-value" style="color: #722ed1;">423</div>
        </div>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>线索列表</span>
          <div>
            <el-select placeholder="状态" style="width: 100px; margin-right: 10px;">
              <el-option label="全部" value="" />
              <el-option label="待分发" value="pending" />
              <el-option label="已分发" value="sent" />
            </el-select>
            <el-input placeholder="搜索手机号" style="width: 150px;" />
          </div>
        </div>
      </template>
      <el-table :data="leads" style="width: 100%">
        <el-table-column prop="id" label="线索ID" width="140" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="amount" label="期望额度" width="100" />
        <el-table-column prop="area" label="地区" width="100" />
        <el-table-column prop="source" label="来源" width="120" />
        <el-table-column prop="tags" label="标签" width="150">
          <template #default="{ row }">
            <el-tag v-for="tag in row.tags" :key="tag" size="small" style="margin-right: 5px;">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已分发' ? 'success' : 'warning'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leads = ref([
  { id: 'LD20240320001', phone: '138****1234', name: '张三', amount: '5万', area: '北京', source: '渠道A', tags: ['高意向', '优质'], status: '待分发', createTime: '2024-01-15 14:32:15' },
  { id: 'LD20240320002', phone: '139****5678', name: '李四', amount: '3万', area: '上海', source: '渠道B', tags: ['白领'], status: '已分发', createTime: '2024-01-15 14:30:42' },
  { id: 'LD20240320003', phone: '137****9012', name: '王五', amount: '8万', area: '深圳', source: 'H5', tags: ['企业主'], status: '已分发', createTime: '2024-01-15 14:28:17' },
])
</script>

<style scoped>
.stat-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stat-title {
  color: #999;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
