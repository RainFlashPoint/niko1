<template>
  <div class="crm">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">客户总数</div>
          <div class="stat-value" style="color: #1890ff;">1,256</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">活跃客户</div>
          <div class="stat-value" style="color: #52c41a;">856</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">待跟进</div>
          <div class="stat-value" style="color: #faad14;">123</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日跟进</div>
          <div class="stat-value" style="color: #722ed1;">45</div>
        </div>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>客户列表</span>
          <div>
            <el-select placeholder="客户类型" style="width: 100px; margin-right: 10px;">
              <el-option label="全部" value="" />
              <el-option label="上游" value="upstream" />
              <el-option label="下游" value="downstream" />
            </el-select>
            <el-input placeholder="搜索客户" style="width: 150px;" />
            <el-button type="primary" size="small" style="margin-left: 10px;">+ 添加客户</el-button>
          </div>
        </div>
      </template>
      <el-table :data="customers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="客户名称" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '上游' ? 'success' : 'warning'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人" width="100" />
        <el-table-column prop="phone" label="电话" width="140" />
        <el-table-column prop="tags" label="标签" width="180">
          <template #default="{ row }">
            <el-tag v-for="tag in row.tags" :key="tag" size="small" style="margin-right: 5px;">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="followUp" label="跟进状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.followUp === '已跟进' ? 'success' : 'warning'">{{ row.followUp }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastTime" label="最后跟进" width="120" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small">跟进</el-button>
            <el-button link type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>跟进记录</span>
          </template>
          <el-timeline>
            <el-timeline-item v-for="(item, index) in timeline" :key="index" :timestamp="item.time" placement="top">
              <el-card>
                <h4>{{ item.title }}</h4>
                <p>{{ item.content }}</p>
                <p style="color: #999; font-size: 12px;">{{ item.operator }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>客户标签</span>
          </template>
          <div class="tags">
            <el-tag v-for="tag in tagOptions" :key="tag.name" :type="tag.type" closable>{{ tag.name }}</el-tag>
            <el-button size="small" type="primary" link>+ 添加标签</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customers = ref([
  { id: 1, name: '渠道A公司', type: '上游', contact: '张经理', phone: '138****1234', tags: ['优质', '长期合作'], followUp: '已跟进', lastTime: '2小时前' },
  { id: 2, name: '客户张三', type: '下游', contact: '李总', phone: '139****5678', tags: ['企业', '高消费'], followUp: '已跟进', lastTime: '1天前' },
  { id: 3, name: '渠道B公司', type: '上游', contact: '王经理', phone: '137****9012', tags: ['新合作'], followUp: '待跟进', lastTime: '3天前' },
  { id: 4, name: '客户李四', type: '下游', contact: '赵总', phone: '136****3456', tags: ['个人'], followUp: '待跟进', lastTime: '5天前' },
])

const timeline = ref([
  { time: '2024-01-15 14:30', title: '电话沟通', content: '客户表示有意向增加投放量', operator: '销售A' },
  { time: '2024-01-14 10:15', title: '合同签署', content: '签订季度合作协议', operator: '销售B' },
  { time: '2024-01-13 16:20', title: '需求确认', content: '确认客户需求和投放预算', operator: '销售A' },
  { time: '2024-01-12 09:00', title: '初次接触', content: '通过展会认识，添加微信', operator: '销售B' },
])

const tagOptions = ref([
  { name: '优质', type: 'success' },
  { name: '长期合作', type: 'success' },
  { name: '新合作', type: 'warning' },
  { name: '高消费', type: 'danger' },
  { name: '企业', type: 'info' },
  { name: '个人', type: 'info' },
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
