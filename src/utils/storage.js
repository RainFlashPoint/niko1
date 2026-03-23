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
}
