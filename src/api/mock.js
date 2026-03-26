// Mock 数据
import Mock from 'mockjs'

// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 渠道数据
const channelData = Mock.mock({
  'list|20': [{
    'id|+1': 1,
    'name': '@cname',
    'type|1': ['上游', '下游'],
    'code': 'CH@(1000,9999)',
    'status|1': ['启用', '禁用'],
    'description': '@cword(10, 30)',
    'createTime': '@datetime'
  }]
})

// 规则数据
const ruleData = Mock.mock({
  'list|15': [{
    'id|+1': 1,
    'name': '@cword(4, 10)',
    'conditions': '{"source": "*"}',
    'strategy|1': ['广播', '权重', '轮询'],
    'targetChannels': '渠道@int(1,10), 渠道@int(11,20)',
    'status|1': ['启用', '禁用'],
    'createTime': '@datetime'
  }]
})

// 流量数据
const flowData = Mock.mock({
  'list|50': [{
    'id|+1': 1001,
    'upstreamChannel': '渠道@int(1,10)',
    'downstreamChannel': '渠道@int(11,20)',
    'status|1': ['成功', '失败', '处理中'],
    'data': '{"phone": "138****1234", "name": "@cname"}',
    'createTime': '@datetime'
  }]
})

// 统计概览
const statsData = {
  today: {
    received: 1256,
    distributed: 1198,
    successRate: 95.4
  },
  weekTrend: [
    { date: '03-19', received: 1100, distributed: 1050 },
    { date: '03-20', received: 1200, distributed: 1150 },
    { date: '03-21', received: 1150, distributed: 1100 },
    { date: '03-22', received: 1300, distributed: 1250 },
    { date: '03-23', received: 1250, distributed: 1200 },
    { date: '03-24', received: 1180, distributed: 1130 },
    { date: '03-25', received: 1256, distributed: 1198 }
  ],
  channelDistribution: [
    { name: '渠道A', value: 35 },
    { name: '渠道B', value: 25 },
    { name: '渠道C', value: 20 },
    { name: '其他', value: 20 }
  ]
}

export default {
  // 登录
  async login(username, password) {
    await delay(300)
    if (username === 'admin' && password === 'admin123') {
      return {
        success: true,
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: {
            id: 1,
            username: 'admin',
            nickname: '管理员',
            role: 'admin'
          }
        }
      }
    }
    return { success: false, message: '用户名或密码错误' }
  },
  
  // 获取渠道列表
  async getChannels(params) {
    await delay(200)
    const { page = 1, pageSize = 10 } = params || {}
    const list = channelData.list.slice((page - 1) * pageSize, page * pageSize)
    return {
      success: true,
      data: {
        list,
        total: channelData.list.length,
        page,
        pageSize
      }
    }
  },
  
  // 新增渠道
  async addChannel(data) {
    await delay(300)
    channelData.list.unshift({
      id: channelData.list.length + 1,
      ...data,
      createTime: new Date().toISOString()
    })
    return { success: true }
  },
  
  // 更新渠道
  async updateChannel(id, data) {
    await delay(300)
    const index = channelData.list.findIndex(item => item.id === id)
    if (index !== -1) {
      channelData.list[index] = { ...channelData.list[index], ...data }
      return { success: true }
    }
    return { success: false, message: '渠道不存在' }
  },
  
  // 删除渠道
  async deleteChannel(id) {
    await delay(300)
    const index = channelData.list.findIndex(item => item.id === id)
    if (index !== -1) {
      channelData.list.splice(index, 1)
      return { success: true }
    }
    return { success: false, message: '渠道不存在' }
  },
  
  // 获取规则列表
  async getRules(params) {
    await delay(200)
    const { page = 1, pageSize = 10 } = params || {}
    const list = ruleData.list.slice((page - 1) * pageSize, page * pageSize)
    return {
      success: true,
      data: {
        list,
        total: ruleData.list.length,
        page,
        pageSize
      }
    }
  },
  
  // 新增规则
  async addRule(data) {
    await delay(300)
    ruleData.list.unshift({
      id: ruleData.list.length + 1,
      ...data,
      createTime: new Date().toISOString()
    })
    return { success: true }
  },
  
  // 更新规则
  async updateRule(id, data) {
    await delay(300)
    const index = ruleData.list.findIndex(item => item.id === id)
    if (index !== -1) {
      ruleData.list[index] = { ...ruleData.list[index], ...data }
      return { success: true }
    }
    return { success: false, message: '规则不存在' }
  },
  
  // 删除规则
  async deleteRule(id) {
    await delay(300)
    const index = ruleData.list.findIndex(item => item.id === id)
    if (index !== -1) {
      ruleData.list.splice(index, 1)
      return { success: true }
    }
    return { success: false, message: '规则不存在' }
  },
  
  // 获取流量数据
  async getFlowData(params) {
    await delay(200)
    const { page = 1, pageSize = 10 } = params || {}
    const list = flowData.list.slice((page - 1) * pageSize, page * pageSize)
    return {
      success: true,
      data: {
        list,
        total: flowData.list.length,
        page,
        pageSize
      }
    }
  },
  
  // 获取统计数据
  async getStats() {
    await delay(300)
    return {
      success: true,
      data: statsData
    }
  }
}