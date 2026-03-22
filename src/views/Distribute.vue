<template>
  <div class="distribute">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">今日线索</div>
          <div class="stat-value" style="color: #1890ff;">423</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">已分发</div>
          <div class="stat-value" style="color: #52c41a;">1,267</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">上游API调用</div>
          <div class="stat-value" style="color: #faad14;">156次</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stat-card">
          <div class="stat-title">下游API调用</div>
          <div class="stat-value" style="color: #722ed1;">289次</div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>📥 上游 API（接收线索）</span>
          </template>
          <div class="api-box">
            <p><strong>接口地址：</strong><code>POST /api/inflow</code></p>
            <p><strong>调用方：</strong>上游渠道</p>
            <p><strong>功能：</strong>上游调用此接口推送线索给我们</p>
            <div class="api-example">
              <p>请求示例：</p>
              <pre>{
  "source": "渠道A",
  "phone": "13812345678",
  "name": "张三",
  "amount": "50000",
  "area": "北京"
}</pre>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>📤 下游 API（推送线索）</span>
          </template>
          <div class="api-box">
            <p><strong>接口地址：</strong><code>POST /api/outflow</code></p>
            <p><strong>调用方：</strong>我们调用下游接口推送线索</p>
            <p><strong>功能：</strong>调用下游API推送线索给他们</p>
            <div class="api-example">
              <p>请求示例：</p>
              <pre>{
  "clientId": "下游客户ID",
  "phone": "13812345678",
  "data": {"name": "张三", "amount": 50000},
  "signature": "md5签名"
}</pre>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>API 调用日志</span>
          <el-select placeholder="类型筛选" style="width: 120px;">
            <el-option label="全部" value="" />
            <el-option label="上行" value="inflow" />
            <el-option label="下行" value="outflow" />
          </el-select>
        </div>
      </template>
      <el-table :data="logs" style="width: 100%">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '上行' ? 'success' : 'warning'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源/客户" width="150" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '成功' ? 'success' : 'danger'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>上游渠道配置</span>
          </template>
          <el-table :data="upstream" style="width: 100%">
            <el-table-column prop="name" label="渠道名称" />
            <el-table-column prop="status" label="状态" width="80">
              <template #default="{ row }">
                <el-tag type="success">启用</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="today" label="今日调用" width="100" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>下游客户配置</span>
          </template>
          <el-table :data="downstream" style="width: 100%">
            <el-table-column prop="name" label="客户名称" />
            <el-table-column prop="apiKey" label="API Key" width="150">
              <template #default="{ row }">
                <code style="font-size: 12px;">{{ row.apiKey }}</code>
              </template>
            </el-table-column>
            <el-table-column prop="today" label="今日推送" width="100" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const logs = ref([
  { time: '14:32:15', type: '上行', source: '渠道A', phone: '138****1234', status: '成功', remark: 'API接收' },
  { time: '14:31:42', type: '下行', source: '客户张三', phone: '138****1234', status: '成功', remark: '推送成功' },
  { time: '14:30:58', type: '上行', source: '渠道B', phone: '139****5678', status: '成功', remark: 'API接收' },
  { time: '14:29:33', type: '下行', source: '客户李四', phone: '139****5678', status: '失败', remark: '下游返回错误' },
])

const upstream = ref([
  { name: '渠道A-信息流', status: '启用', today: 156 },
  { name: '渠道B-搜索', status: '启用', today: 89 },
  { name: '渠道C-社群', status: '启用', today: 45 },
])

const downstream = ref([
  { name: '客户张三', apiKey: 'sk_live_abc***', today: 234 },
  { name: '客户李四', apiKey: 'sk_live_def***', today: 156 },
  { name: '客户王五', apiKey: 'sk_live_ghi***', today: 0 },
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

.api-box {
  font-size: 14px;
}

.api-box code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  color: #1890ff;
}

.api-example {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
}

.api-example pre {
  margin: 0;
  font-size: 12px;
  color: #666;
}
</style>
