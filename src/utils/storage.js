// localStorage 存储辅助工具
export function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`
}

export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) {
      if (fallback !== null) {
        const data = JSON.stringify(fallback)
        localStorage.setItem(key, data)
        return fallback
      }
      return null
    }
    return JSON.parse(raw)
  } catch (e) {
    console.warn(`readStorage error for ${key}`, e)
    return fallback
  }
}

export function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(`saveStorage error for ${key}`, e)
  }
}

// 初始化默认数据
export function initDefaultData() {
  // 用户
  if (!localStorage.getItem('crm_users')) {
    saveStorage('crm_users', [
      { id: '1', username: 'admin', password: '123456', name: '管理员', role: 'admin' },
      { id: '2', username: 'zhangsan', password: '123456', name: '张三', role: 'user' },
    ])
  }
  
  // 上游
  if (!localStorage.getItem('crm_upstreams')) {
    saveStorage('crm_upstreams', [
      { id: 'u1', name: '上游A', platform: '渠道A', contact: '张经理', contactPhone: '13800138001', apiEndpoint: 'https://api.upstream-a.com', costPerLead: 50, status: 'active', remark: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'u2', name: '上游B', platform: '渠道B', contact: '李经理', contactPhone: '13800138002', apiEndpoint: 'https://api.upstream-b.com', costPerLead: 45, status: 'active', remark: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'u3', name: '上游C', platform: '直客', contact: '王总', contactPhone: '13800138003', apiEndpoint: 'https://api.upstream-c.com', costPerLead: 60, status: 'inactive', remark: '暂停合作', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ])
  }
  
  // 下游
  if (!localStorage.getItem('crm_downstreams')) {
    saveStorage('crm_downstreams', [
      { id: 'd1', clientName: '客户A', contactPerson: '赵总', contactPhone: '13900139001', email: 'zhao@example.com', apiKey: 'ds_abc123def456', feedUrl: 'https://feed.client-a.com', pricingModel: 'cpa', price: 100, status: 'enabled', remark: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'd2', clientName: '客户B', contactPerson: '钱总', contactPhone: '13900139002', email: 'qian@example.com', apiKey: 'ds_xyz789ghi012', feedUrl: 'https://feed.client-b.com', pricingModel: 'cps', price: 150, status: 'enabled', remark: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ])
  }
  
  // CRM客户
  if (!localStorage.getItem('crm_customers')) {
    saveStorage('crm_customers', [
      { id: 'c1', name: '客户甲', phone: '13700137001', city: '北京', loanAmount: 50000, status: 'new', upstreamId: 'u1', tags: ['高意向'], remark: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'c2', name: '客户乙', phone: '13700137002', city: '上海', loanAmount: 30000, status: 'contacted', upstreamId: 'u2', tags: [], remark: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ])
  }
  
  // 分发配置
  if (!localStorage.getItem('crm_distributions')) {
    saveStorage('crm_distributions', [
      { id: 'dist1', name: '规则A', upstreamId: 'u1', downstreamId: 'd1', matchCriteria: { city: ['北京', '上海'] }, price: 80, status: 'active', priority: 1, createdBy: '1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'dist2', name: '规则B', upstreamId: 'u2', downstreamId: 'd2', matchCriteria: {}, price: 100, status: 'active', priority: 2, createdBy: '1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ])
  }
  
  // 财务记录
  if (!localStorage.getItem('crm_financials')) {
    saveStorage('crm_financials', [
      { id: 'f1', type: 'income', relatedId: 'd1', amount: 5000, currency: 'CNY', occurredAt: '2026-03-23', description: '下游消费', status: 'confirmed' },
      { id: 'f2', type: 'expense', relatedId: 'u1', amount: 2000, currency: 'CNY', occurredAt: '2026-03-23', description: '上游采购', status: 'confirmed' },
    ])
  }
  
  // H5落地页
  if (!localStorage.getItem('crm_landing_pages')) {
    saveStorage('crm_landing_pages', [
      { id: 'lp1', title: '流量包A推广页', url: 'https://example.com/lp/1', sourceChannel: '上游A', views: 1250, converts: 85, status: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'lp2', title: '流量包B推广页', url: 'https://example.com/lp/2', sourceChannel: '上游B', views: 980, converts: 62, status: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ])
  }

  // 上游推送流量
  if (!localStorage.getItem('upstream_leads')) {
    saveStorage('upstream_leads', [
      { id: 'lead-1001', channelName: '上游A', channelCode: 'UA-001', pushTime: '2026-03-23T09:12:00.000Z', leadName: '李娜', leadPhone: '13600010001', leadSource: '表单', productName: '信用贷A', region: '北京', status: 'new', remark: '' },
      { id: 'lead-1002', channelName: '上游A', channelCode: 'UA-001', pushTime: '2026-03-23T10:35:00.000Z', leadName: '王磊', leadPhone: '13600010002', leadSource: 'H5', productName: '信用贷B', region: '上海', status: 'processed', remark: '' },
      { id: 'lead-1003', channelName: '上游B', channelCode: 'UB-002', pushTime: '2026-03-23T11:05:00.000Z', leadName: '赵敏', leadPhone: '13600010003', leadSource: 'API', productName: '车贷', region: '广州', status: 'new', remark: '' },
      { id: 'lead-1004', channelName: '上游C', channelCode: 'UC-003', pushTime: '2026-03-23T13:20:00.000Z', leadName: '刘强', leadPhone: '13600010004', leadSource: '表单', productName: '房贷', region: '深圳', status: 'invalid', remark: '' },
      { id: 'lead-1005', channelName: '上游B', channelCode: 'UB-002', pushTime: '2026-03-23T15:40:00.000Z', leadName: '陈晨', leadPhone: '13600010005', leadSource: 'API', productName: '经营贷', region: '杭州', status: 'processed', remark: '' },
      { id: 'lead-1006', channelName: '上游A', channelCode: 'UA-001', pushTime: '2026-03-23T16:10:00.000Z', leadName: '孙浩', leadPhone: '13600010006', leadSource: 'H5', productName: '信用贷A', region: '南京', status: 'new', remark: '' },
      { id: 'lead-1007', channelName: '上游C', channelCode: 'UC-003', pushTime: '2026-03-24T08:25:00.000Z', leadName: '周倩', leadPhone: '13600010007', leadSource: '表单', productName: '信用贷C', region: '武汉', status: 'new', remark: '' },
      { id: 'lead-1008', channelName: '上游A', channelCode: 'UA-001', pushTime: '2026-03-24T09:45:00.000Z', leadName: '唐伟', leadPhone: '13600010008', leadSource: 'API', productName: '车贷', region: '成都', status: 'processed', remark: '' },
      { id: 'lead-1009', channelName: '上游B', channelCode: 'UB-002', pushTime: '2026-03-24T10:15:00.000Z', leadName: '苏雅', leadPhone: '13600010009', leadSource: 'H5', productName: '信用贷B', region: '重庆', status: 'new', remark: '' },
      { id: 'lead-1010', channelName: '上游C', channelCode: 'UC-003', pushTime: '2026-03-24T11:05:00.000Z', leadName: '高鹏', leadPhone: '13600010010', leadSource: '表单', productName: '经营贷', region: '西安', status: 'invalid', remark: '' },
      { id: 'lead-1011', channelName: '上游A', channelCode: 'UA-001', pushTime: '2026-03-24T12:30:00.000Z', leadName: '姚雪', leadPhone: '13600010011', leadSource: 'H5', productName: '信用贷A', region: '天津', status: 'processed', remark: '' },
      { id: 'lead-1012', channelName: '上游B', channelCode: 'UB-002', pushTime: '2026-03-24T14:10:00.000Z', leadName: '许宁', leadPhone: '13600010012', leadSource: 'API', productName: '车贷', region: '苏州', status: 'new', remark: '' },
    ])
  }
}
