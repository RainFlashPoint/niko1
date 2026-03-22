# 信贷流量平台 API 接口文档

## 概述

平台提供标准化的 REST API，供上游渠道推送线索和下游客户接收线索。

---

## 一、上游 API（接收线索）

### 1.1 推送线索

**接口地址**
```
POST https://api.example.com/v1/inflow
```

**请求头**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| Content-Type | string | 是 | application/json |
| X-App-Id | string | 是 | 上游渠道标识 |
| X-Signature | string | 是 | 请求签名 |

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
  "income": "20000",
  "remark": "备注信息"
}
```

**字段说明**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号（11位） |
| name | string | 是 | 姓名 |
| amount | string | 否 | 期望额度 |
| area | string | 否 | 所在地区 |
| source | string | 否 | 来源标识 |
| gender | string | 否 | 性别 |
| age | int | 否 | 年龄 |
| income | string | 否 | 月收入 |
| remark | string | 否 | 备注 |

**响应示例**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "leadId": "LD20240320001",
    "phone": "13800138000",
    "receiveTime": "2024-01-15 14:30:00"
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

## 二、下游 API（推送线索）

### 2.1 配置下游回调地址

在后台配置下游客户的回调地址和签名密钥。

### 2.2 推送线索给下游

当有新线索时，系统自动推送给匹配的下游客户。

**调用下游接口示例**
```
POST https://下游客户回调地址
Headers:
  Content-Type: application/json
  X-Signature: md5(body + secret)
```

**推送请求体**
```json
{
  "leadId": "LD20240320001",
  "phone": "13800138000",
  "name": "张三",
  "amount": "50000",
  "area": "北京",
  "gender": "男",
  "age": 35,
  "income": "20000",
  "source": "渠道A",
  "pushTime": "2024-01-15 14:30:05"
}
```

**下游响应处理**
- 返回 200：推送成功
- 返回非200：推送失败，系统会自动重试3次

---

## 三、签名算法

### 3.1 请求签名

```
Signature = md5(请求体JSON字符串 + AppSecret)
```

示例：
```javascript
const crypto = require('crypto');

function generateSignature(body, secret) {
  const signString = JSON.stringify(body) + secret;
  return crypto.createHash('md5').update(signString).digest('hex');
}
```

---

## 四、Demo 代码

### 4.1 上游推送线索（Python）

```python
import requests
import hashlib
import json
import time

# 配置
APP_ID = "your_app_id"
APP_SECRET = "your_app_secret"
API_URL = "https://api.example.com/v1/inflow"

# 签名
def generate_signature(body, secret):
    sign_string = json.dumps(body, ensure_ascii=False) + secret
    return hashlib.md5(sign_string.encode('utf-8')).hexdigest()

# 推送线索
def push_lead(phone, name, amount="50000", area="北京", source="测试"):
    body = {
        "phone": phone,
        "name": name,
        "amount": amount,
        "area": area,
        "source": source,
        "timestamp": int(time.time() * 1000)
    }
    
    headers = {
        "Content-Type": "application/json",
        "X-App-Id": APP_ID,
        "X-Signature": generate_signature(body, APP_SECRET)
    }
    
    response = requests.post(API_URL, json=body, headers=headers)
    return response.json()

# 测试
result = push_lead("13800138000", "张三", "50000", "北京", "渠道A")
print(result)
```

### 4.2 上游推送线索（Node.js）

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
async function pushLead(phone, name, amount = '50000', area = '北京', source = '测试') {
  const body = {
    phone,
    name,
    amount,
    area,
    source,
    timestamp: Date.now()
  };
  
  const headers = {
    'Content-Type': 'application/json',
    'X-App-Id': APP_ID,
    'X-Signature': generateSignature(body, APP_SECRET)
  };
  
  const response = await axios.post(API_URL, body, { headers });
  return response.data;
}

// 测试
pushLead('13800138000', '张三', '50000', '北京', '渠道A')
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### 4.3 下游接收线索（Node.js）

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// 签名验证
function verifySignature(body, signature, secret) {
  const signString = JSON.stringify(body) + secret;
  const expected = crypto.createHash('md5').update(signString).digest('hex');
  return signature === expected;
}

// 接收线索回调
app.post('/webhook', (req, res) => {
  const { signature } = req.headers;
  const SECRET = 'your_webhook_secret';
  
  // 验证签名
  if (!verifySignature(req.body, signature, SECRET)) {
    return res.status(401).json({ code: 1003, message: 'signature error' });
  }
  
  const { leadId, phone, name, amount, area } = req.body;
  
  console.log('收到新线索:', { leadId, phone, name, amount, area });
  
  // 处理线索业务逻辑...
  
  // 返回成功
  res.json({ code: 0, message: 'success' });
});

app.listen(3000, () => {
  console.log('下游接收服务启动: http://localhost:3000');
});
```

---

## 五、注意事项

1. **请求频率**：上游推送频率不超过 10 次/秒
2. **签名密钥**：请妥善保管，不要泄露
3. **重试机制**：下游接口失败时，系统会自动重试3次
4. **数据安全**：手机号等敏感信息建议加密传输

---

## 六、测试环境

测试环境地址：`https://api-test.example.com/v1/inflow`

测试用的 AppId 和 Secret 请联系管理员获取。
