<template>
  <div class="distribute-page">
    <div class="toolbar">
      <el-select v-model="selectedUpstream" placeholder="选择上游" style="width: 200px; margin-right: 10px">
        <el-option v-for="u in upstreams" :key="u.id" :label="u.name" :value="u.id" />
      </el-select>
      <el-button type="primary" @click="handleAdd">+ 添加分发</el-button>
    </div>

    <el-alert v-if="!selectedUpstream" title="请先选择上游" type="info" :closable="false" style="margin-top: 20px" />

    <template v-else>
      <div class="distribute-card">
        <h3>{{ currentUpstream?.name }} - 分发下游</h3>
        <p class="tips">选择该上游可以推送的下游客户，不选择则推送给所有下游</p>
        
        <el-checkbox-group v-model="selectedDownstreams" class="downstream-list">
          <el-checkbox v-for="d in downstreams" :key="d.id" :label="d.id" border class="downstream-item">
            <div class="downstream-info">
              <div class="name">{{ d.clientName }}</div>
              <div class="price">¥{{ d.price }}/条</div>
            </div>
          </el-checkbox>
        </el-checkbox-group>

        <div style="margin-top: 20px">
          <el-button type="primary" @click="handleSave">保存配置</el-button>
        </div>
      </div>
    </template>

    <!-- 已配置列表 -->
    <div v-if="Object.keys(distributionMap).length > 0" style="margin-top: 30px">
      <h3>分发配置汇总</h3>
      <el-table :data="distributionSummary" style="width: 100%; margin-top: 10px">
        <el-table-column prop="upstreamName" label="上游" />
        <el-table-column prop="downstreamNames" label="可推送下游">
          <template #default="{ row }">
            <el-tag v-for="name in row.downstreamNames" :key="name" size="small" style="margin-right: 4px">{{ name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.downstreamNames.length ? 'success' : 'info'">
              {{ row.downstreamNames.length ? '已配置' : '推给全部' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { readStorage, saveStorage } from '../utils/storage'

const upstreams = ref([])
const downstreams = ref([])
const selectedUpstream = ref('')
const selectedDownstreams = ref([])

// 分发配置存储结构: { upstreamId: [downstreamId1, downstreamId2] }
const distributionMap = ref({})

onMounted(() => {
  upstreams.value = readStorage('crm_upstreams') || []
  downstreams.value = readStorage('crm_downstreams') || []
  
  const saved = readStorage('crm_distributions_simple')
  distributionMap.value = saved || {}
  
  if (upstreams.value.length > 0) {
    selectedUpstream.value = upstreams.value[0].id
  }
})

// 当前选中的上游
const currentUpstream = computed(() => upstreams.value.find(u => u.id === selectedUpstream.value))

// 监听上游变化，更新选中状态
watch(selectedUpstream, (newVal) => {
  selectedDownstreams.value = distributionMap.value[newVal] || []
})

// 配置汇总
const distributionSummary = computed(() => {
  return upstreams.value.map(u => {
    const ds = distributionMap.value[u.id] || []
    return {
      upstreamId: u.id,
      upstreamName: u.name,
      downstreamNames: ds.map(did => downstreams.value.find(d => d.id === did)?.clientName || did)
    }
  })
})

function handleAdd() {
  // 选择上游后直接配置
}

function handleSave() {
  if (!selectedUpstream.value) return
  
  distributionMap.value[selectedUpstream.value] = selectedDownstreams.value
  saveStorage('crm_distributions_simple', distributionMap.value)
  
  ElMessage.success('保存成功')
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; margin-bottom: 20px; }
.distribute-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
.distribute-card h3 { margin-bottom: 10px; }
.tips { color: #888; font-size: 14px; margin-bottom: 20px; }
.downstream-list { display: flex; flex-wrap: wrap; gap: 10px; }
.downstream-item {
  width: 180px;
  margin: 0 !important;
}
.downstream-info { padding: 5px 0; }
.downstream-info .name { font-weight: bold; }
.downstream-info .price { color: #67C23A; font-size: 12px; }
</style>
