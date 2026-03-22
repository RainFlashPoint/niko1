# 📡 信贷流量平台 API 接口文档

---

## 一、概述

平台提供标准化 REST API，用于：
- ✅ 上游渠道推送线索给我们
- ✅ 我们推送线索给下游客户

**基础信息**
| 项目 | 值 |
|------|------|
| 基础URL | `https://api.example.com` |
| 数据格式 | JSON |
| 编码 | UTF-8 |
| 签名算法 | MD5 |

---

## 二、上游 API（接收线索）

### 2.1 推送线索

**请求地址**
```
POST /v1/inflow
```

**请求头**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| Content-Type | string | ✅ | application/json |
| X-App-Id | string | ✅ | 渠道标识 |
| X-Signature | string | ✅ | 签名 |

**请求体**
```json
{
  "phone": "13800138000",
  "name": "张三",
  "amount": "50000",
  "area": "北京",
  "source": "渠道A",
  "gender": "男",
  "age": 35,
  "income": "20000"
}
```

**字段说明**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | ✅ | 手机号（11位） |
| name | string | ✅ | 姓名 |
| amount | string | - | 期望额度 |
| area | string | - | 所在地区 |
| source | string | - | 来源标识 |
| gender | string | - | 性别 |
| age | int | - | 年龄 |
| income | string | - | 月收入 |

**响应示例**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "leadId": "LD20240320001",
    "phone": "13800138000",
    "receiveTime": "2024-01-15T14:30:00Z"
  }
}
```

**错误码**
| code | message | 说明 |
|------|---------|------|
| 0 | success | 成功 |
| 1001 | missing parameter | 缺少必填参数 |
| 1002 | invalid phone | 手机号格式错误 |
| 1003 | signature error | 签名错误 |
| 1004 | channel disabled | 渠道已禁用 |
| 1005 | rate limit | 请求过于频繁 |

---

## 三、下游 API（推送线索）

### 3.1 推送规则

当有新线索时，系统根据分发规则自动推送给匹配的下游客户。

**调用方式**
```
POST 下游回调地址
```

**请求头**
| 参数 | 说明 |
|------|------|
| Content-Type | application/json |
| X-Signature | 签名 |

**请求体**
```json
{
  "leadId": "LD20240320001",
  "phone": "13800138000",
  "name": "张三",
  "amount": "50000",
  "area": "北京",
  "gender": "男",
  "age": 35,
  "source": "渠道A",
  "pushTime": "2024-01-15T14:30:05Z"
}
```

**下游响应**
| 状态码 | 说明 |
|--------|------|
| 200 | 接收成功 |
| 其他 | 失败，自动重试3次 |

---

## 四、签名算法

### 4.1 生成签名

```
Signature = MD5(JSON.stringify(body) + AppSecret)
```

**示例（Node.js）**
```javascript
const crypto = require('crypto');

function generateSignature(body, secret) {
  const signString = JSON.stringify(body) + secret;
  return crypto.createHash('md5').update(signString).digest('hex');
}
```

**示例（Python）**
```python
import hashlib
import json

def generate_signature(body, secret):
    sign_string = json.dumps(body, ensure_ascii=False) + secret
    return hashlib.md5(sign_string.encode('utf-8')).hexdigest()
```

---

## 五、Demo 代码

### 5.1 上游推送（Node.js）

```javascript
const axios = require('axios');
const crypto = require('crypto');

// 配置
const APP_ID = 'your_app_id';
const APP_SECRET = 'your_app_secret';
const API_URL = 'https://api.example.com/v1/inflow';

// 签名
function generateSignature(body, secret) {
  const signString = JSON.stringify(body) + secret;
  return crypto.createHash('md5').update(signString).digest('hex');
}

// 推送线索
async function pushLead(phone, name, amount = '50000', area = '北京') {
  const body = { phone, name, amount, area };
  
  const headers = {
    'Content-Type': 'application/json',
    'X-App-Id': APP_ID,
    'X-Signature': generateSignature(body, APP_SECRET)
  };
  
  const response = await axios.post(API_URL, body, { headers });
  return response.data;
}

// 测试
pushLead('13800138000', '张三', '50000', '北京')
  .then(console.log)
  .catch(console.error);
```

### 5.2 上游推送（Python）

```python
import requests
import hashlib
import json
import time

# 配置
APP_ID = 'your_app_id'
APP_SECRET = 'your_app_secret'
API_URL = 'https://api.example.com/v1/inflow'

def generate_signature(body, secret):
    sign_string = json.dumps(body, ensure_ascii=False) + secret
    return hashlib.md5(sign_string.encode('utf-8')).hexdigest()

def push_lead(phone, name, amount='50000', area='北京'):
    body = {
        'phone': phone,
        'name': name,
        'amount': amount,
        'area': area,
        'timestamp': int(time.time() * 1000)
    }
    
    headers = {
        'Content-Type': 'application/json',
        'X-App-Id': APP_ID,
        'X-Signature': generate_signature(body, APP_SECRET)
    }
    
    response = requests.post(API_URL, json=body, headers=headers)
    return response.json()

# 测试
result = push_lead('13800138000', '张三', '50000', '北京')
print(result)
```

### 5.3 下游接收（Node.js）

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// 签名验证
function verifySignature(body, signature, secret) {
  const signString = JSON.stringify(body) + secret;
  return signature === crypto.createHash('md5').update(signString).digest('hex');
}

// 接收线索回调
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-signature'];
  const SECRET = 'your_webhook_secret';
  
  // 验证签名
  if (!verifySignature(req.body, signature, SECRET)) {
    return res.status(401).json({ code: 1003, message: 'signature error' });
  }
  
  const { leadId, phone, name, amount, area } = req.body;
  console.log('收到新线索:', { leadId, phone, name, amount, area });
  
  // 处理业务...
  
  res.json({ code: 0, message: 'success' });
});

app.listen(3000, () => console.log('服务启动: 3000'));
```

---

## 六、测试

### 测试渠道
| AppId | AppSecret | 说明 |
|-------|-----------|------|
| uk_test001 | secret001 | 测试渠道A |
| uk_test002 | secret002 | 测试渠道B |

### 测试命令
```bash
# 启动 Mock Server
node server/mock-api.js

# 测试推送
curl -X POST http://localhost:3000/api/v1/inflow \
  -H "Content-Type: application/json" \
  -H "X-App-Id: uk_test001" \
  -H "X-Signature: $(echo -n '{"phone":"13800138000","name":"张三"}secret001' | md5)" \
  -d '{"phone":"13800138000","name":"张三"}'
```

---

## 七、注意事项

| 事项 | 说明 |
|------|------|
| 请求频率 | 不超过 10 次/秒 |
| 签名密钥 | 请妥善保管，不要泄露 |
| 重试机制 | 下游失败时自动重试 3 次 |
| 数据安全 | 敏感信息建议加密传输 |

---

**文档版本**: v1.0  
**更新时间**: 2024-01-15
