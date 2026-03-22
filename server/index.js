import express from 'express'
import cors from 'cors'
import crypto from 'crypto'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// 模拟数据存储
const inflowRecords = []
const outflowRecords = []
const secret = 'demo_secret_key'

// 仪表盘数据
app.get('/api/dashboard', (req, res) => {
  res.json({
    today: { flow: 2847, rate: '8.2%', income: 28450, cost: 15200 },
    trend: [
      { day: '周一', inflow: 1200, outflow: 800 },
      { day: '周二', inflow: 1400, outflow: 1000 },
      { day: '周三', inflow: 1100, outflow: 900 },
      { day: '周四', inflow: 1600, outflow: 1200 },
      { day: '周五', inflow: 1800, outflow: 1400 },
      { day: '周六', inflow: 2100, outflow: 1600 },
      { day: '周日', inflow: 2400, outflow: 1800 },
    ]
  })
})

// 上游渠道数据
app.get('/api/purchase', (req, res) => {
  res.json({
    channels: [
      { id: 1, name: '渠道A-信息流', type: '信息流', apiUrl: 'http://api.channel-a.com/push', todayCount: 1245, cost: 8.5, status: 'active' },
      { id: 2, name: '渠道B-搜索', type: '搜索', apiUrl: 'http://api.channel-b.com/push', todayCount: 856, cost: 12.0, status: 'active' },
      { id: 3, name: '渠道C-社群', type: '社群', apiUrl: 'http://api.channel-c.com/push', todayCount: 432, cost: 5.0, status: 'active' },
      { id: 4, name: '渠道D-线下', type: '线下', apiUrl: 'http://api.channel-d.com/push', todayCount: 0, cost: 15.0, status: 'inactive' },
    ]
  })
})

// 下游客户数据
app.get('/api/sales', (req, res) => {
  res.json({
    customers: [
      { id: 1, name: '客户张三', type: '企业', apiKey: 'sk_live_abc123****xyz', todayCount: 456, price: 15.0, status: 'active' },
      { id: 2, name: '客户李四', type: '个人', apiKey: 'sk_live_def456****uvw', todayCount: 234, price: 12.0, status: 'active' },
      { id: 3, name: '客户王五', type: '企业', apiKey: 'sk_live_ghi789****rst', todayCount: 0, price: 18.0, status: 'inactive' },
    ]
  })
})

// 接收上游流量
app.post('/api/inflow', (req, res) => {
  const { source, phone, name, amount, area, timestamp } = req.body
  
  if (!source || !phone || !name) {
    return res.status(422).json({ message: '缺失必填参数' })
  }
  
  const record = {
    id: inflowRecords.length + 1,
    source,
    phone,
    name,
    amount,
    area,
    timestamp: timestamp || Date.now(),
    time: new Date().toISOString().replace('T', ' ').substring(0, 19)
  }
  
  inflowRecords.unshift(record)
  
  console.log('📥 收到上游流量:', record)
  
  res.json({ 
    message: '上游流量已接收', 
    record 
  })
})

// 推送数据给下游
app.post('/api/outflow', (req, res) => {
  const { clientId, phone, data, timestamp, signature } = req.body
  
  if (!clientId || !timestamp || !signature) {
    return res.status(422).json({ message: '签名/参数缺失' })
  }
  
  // 验证签名
  const expected = crypto.createHash('md5').update(`${clientId}${timestamp}${secret}`).digest('hex')
  
  if (expected !== signature) {
    return res.status(401).json({ message: '签名校验失败' })
  }
  
  const record = {
    id: outflowRecords.length + 1,
    clientId,
    phone,
    data,
    timestamp,
    time: new Date().toISOString().replace('T', ' ').substring(0, 19)
  }
  
  outflowRecords.unshift(record)
  
  console.log('📤 推送数据给下游:', record)
  
  res.json({ 
    message: '下游推送成功', 
    record 
  })
})

// 获取推送记录
app.get('/api/outflow/records', (req, res) => {
  res.json({ records: outflowRecords })
})

// 获取流入记录
app.get('/api/inflow/records', (req, res) => {
  res.json({ records: inflowRecords })
})

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Mock API Server Running            ║
║   📍 http://localhost:${PORT}              ║
║                                         ║
║   📥 POST /api/inflow   接收上游流量    ║
║   📤 POST /api/outflow  推送下游数据    ║
╚═══════════════════════════════════════════╝
  `)
})
