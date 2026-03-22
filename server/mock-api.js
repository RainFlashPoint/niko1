/**
 * 信贷流量平台 - Mock API Server (ESM)
 */

import express from 'express';
import crypto from 'crypto';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 线索数据
const leads = [];
const apiLogs = [];

// 渠道配置
const channels = {
  'uk_test001': { secret: 'secret001', name: '测试渠道A', enabled: true },
  'uk_test002': { secret: 'secret002', name: '测试渠道B', enabled: true }
};

// 签名
function generateSignature(body, secret) {
  const signString = JSON.stringify(body) + secret;
  return crypto.createHash('md5').update(signString).digest('hex');
}

function verifySignature(body, signature, secret) {
  return generateSignature(body, secret) === signature;
}

function addLog(type, source, data, status, remark) {
  const log = {
    time: new Date().toISOString(),
    type,
    source,
    phone: data?.phone,
    status,
    remark
  };
  apiLogs.unshift(log);
  console.log(`[${type}] ${source} -> ${status}: ${remark}`);
}

// 上游接收线索
app.post('/api/v1/inflow', (req, res) => {
  const { phone, name } = req.body;
  const appId = req.headers['x-app-id'];
  const signature = req.headers['x-signature'];
  
  if (!phone || !name) {
    addLog('上行', appId || 'unknown', req.body, '失败', '缺少必填参数');
    return res.status(400).json({ code: 1001, message: 'missing parameter' });
  }
  
  const channel = channels[appId];
  if (!channel || !channel.enabled) {
    addLog('上行', appId, req.body, '失败', '渠道不可用');
    return res.status(403).json({ code: 1004, message: 'channel disabled' });
  }
  
  if (!verifySignature(req.body, signature, channel.secret)) {
    addLog('上行', appId, req.body, '失败', '签名错误');
    return res.status(401).json({ code: 1003, message: 'signature error' });
  }
  
  const leadId = 'LD' + Date.now();
  const lead = {
    leadId,
    phone,
    name,
    amount: req.body.amount || '',
    area: req.body.area || '',
    source: channel.name,
    createTime: new Date().toISOString(),
    status: 'pending'
  };
  
  leads.unshift(lead);
  addLog('上行', channel.name, { phone, leadId }, '成功', '线索已接收');
  
  res.json({
    code: 0,
    message: 'success',
    data: { leadId, phone, receiveTime: lead.createTime }
  });
});

// 查询线索
app.get('/api/v1/leads', (req, res) => {
  res.json({ code: 0, data: { list: leads, total: leads.length } });
});

// 查询日志
app.get('/api/v1/logs', (req, res) => {
  res.json({ code: 0, data: apiLogs.slice(0, 50) });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Mock API Server 端口: ${PORT}       ║
║                                         ║
║   POST /api/v1/inflow  接收上游线索      ║
║   GET  /api/v1/leads   查询线索         ║
║   GET  /api/v1/logs   查询日志         ║
╚═══════════════════════════════════════════╝
  `);
});
