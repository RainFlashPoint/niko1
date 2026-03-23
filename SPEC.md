# 流量中转CRM系统 - 前端功能需求规格说明

## 1. 概述
- **目标**: 设计实现一个面向流量中转场景的 CRM 前端界面，覆盖登录、仪表盘、上下游管理、客户管理、分发配置、财务、H5落地页、销售与采购统计等功能。
- **技术约束**: Vue 3 或 React，单页应用。所有 CRUD 相关数据通过 `localStorage` 存储，用户信息也保存在 `localStorage` 供页面及权限判断使用。
- **非功能要求**: 需适配 PC，界面风格稳健专业；所有展示数据需提供明确字段描述；图表可使用 ECharts/Chart.js。

## 2. 登录功能
### 2.1 功能说明
- 用户通过用户名和密码登录。提交表单后验证非空，成功时:
  - 将当前用户信息（`userId`、`username`、`displayName`、`roles`）保存至 `localStorage`，键名建议 `crm_user`。
  - 记录登录时间 `lastLogin`。
  - 跳转至仪表盘。
- 登录页面需提供“记住我”开关（选中时记住用户名并在登录页表单自动填入）。

### 2.2 字段
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| username | string | 登录账号 |
| password | string | 登录密码（前端不持久化，仅用于提交） |
| remember | boolean | 记住用户名 |

## 3. 仪表盘
### 3.1 核心需求
- 展示统计卡片与图表，帮助运营快速掌握流量和财务表现。
- 图表至少包含 7 天趋势 (曲线图) 和渠道占比 (饼图/柱图)。

### 3.2 显示卡片字段
| 指标 | 描述 | 计算基础 |
| ---- | ---- | ---- |
| 今日流量数 | 当日接入条数 | 读取上游流量记录过滤今日 |
| 今日转化数 | 下游成功交付条数 | 读取分发配置+CRM数据过滤状态=
| 日收入 | 通过分发配置与客户结算金额 | 按`crm_distributions`中`price`和`status`聚合 |
| 日成本 | 上游采购成本 | 上游记录中`cost`聚合 |
| 利润 | 收入-成本 | 同上 |
| 活跃上游/下游 | 本周有交易的渠道数量 | 

### 3.3 图表字段
- **流量趋势图**: `date`, `inflowCount`, `outflowCount`, `revenue`, `cost`。
- **渠道分布图**: `channelId`, `channelName`, `inflowCount`, `conversionRate`。
- **财务走势**: `date`, `revenue`, `cost`, `profit`。

## 4. 上游管理（采购渠道）
### 4.1 功能
- 提供列表 + 新增/编辑/删除/查看。
- 数据通过 `localStorage` 保存，建议键名 `crm_upstreams`。

### 4.2 字段
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | string | 唯一标识，前端生成 UUID |
| name | string | 渠道名称 |
| platform | string | 渠道平台（如：渠道A） |
| contact | string | 联系人/负责人 |
| contactPhone | string | 联系电话 |
| apiEndpoint | string | 上游回传地址 |
| costPerLead | number | 单条采购成本 |
| status | enum | `active`/`inactive` |
| remark | string | 备注 |
| createdAt | datetime | 创建时间 |
| updatedAt | datetime | 最后更新时间 |

### 4.3 行为
- 列表支持筛选 `platform`, 状态和关键词。
- 新增/编辑表单校验 `name`, `costPerLead`、`apiEndpoint` 必填。
- 删除需确认弹窗。

## 5. 下游管理（销售客户）
### 5.1 内容
- CRUD 操作，字段存储在 `localStorage`，键名 `crm_downstreams`。

### 5.2 字段
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | string | 唯一标识 |
| clientName | string | 客户公司/品牌 |
| contactPerson | string | 客户联系人 |
| contactPhone | string | 手机号码 |
| email | string | 邮箱 |
| apiKey | string | 接入密钥（前端生成，可复制） |
| feedUrl | string | 下游接收地址 |
| pricingModel | enum | `cpa`/`cps`/`fixed` |
| price | number | 单条价格 |
| status | enum | `enabled`/`disabled` |
| remark | string | 备注 |
| createdAt | datetime | 创建时间 |
| updatedAt | datetime | 更新时间 |

### 5.3 操作补充
- 客户表格展示 `clientName`、`status`、`price`、`pricingModel`、`createdAt`。
- 提供 API Key 一键复制。

## 6. CRM客户管理
### 6.1 目标
- 维护落地页真实客户信息，与流量数据关联。
- CRUD 存 `localStorage`, 键名 `crm_customers`。

### 6.2 字段
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | string | UUID |
| name | string | 客户姓名 |
| phone | string | 手机 |
| city | string | 所在城市 |
| loanAmount | number | 申请额度 |
| status | enum | `new`/`contacted`/`approved`/`rejected` |
| assignedDownstreamId | string | 指向下游客户 id |
| upstreamId | string | 渠道来源 id |
| tags | string[] | 标签，如“高意向” |
| createdAt | datetime | 录入时间 |
| updatedAt | datetime | 更新时间 |

### 6.3 视图与功能
- 列表支持按 `phone`, `status`, `tags` 搜索。
- 点击进入详情页展示所有字段。
- 客户新增时可选择上游/下游关联。

## 7. 分发配置
### 7.1 理解
- 定义流量分发规则，决定哪些客户推送给哪个下游。
- 存储在 `localStorage`，键 `crm_distributions`。

### 7.2 字段
| 字段 | 描述 |
| ---- | ---- |
| id | UUID |
| name | 配置名称 |
| upstreamId | 关联上游渠道 id |
| downstreamId | 关联下游客户 id |
| matchCriteria | object | 过滤条件（城市/额度/标签） |
| price | number | 下游计费金额 |
| status | enum | `active`/`paused` |
| priority | number | 优先级，数值越大越先匹配 |
| createdBy | string | 用户 id |
| createdAt | datetime |
| updatedAt | datetime |

### 7.3 操作
- 支持按 `upstreamId`, `downstreamId`, `status`, `priority` 排序/过滤。
- 编辑时可以调整匹配条件。
- 提供“测试规则”按钮，模拟一条流量如何匹配。

## 8. 财务模块
### 8.1 要求
- 只读页面，展示采购成本与销售收入明细。
- 数据源为 `localStorage` 中分发配置、上下游记录生成的模拟交易（键名 `crm_financials`）。

### 8.2 字段
| 字段 | 描述 |
| ---- | ---- |
| id | UUID |
| type | `expense`/`income` |
| relatedId | 关联上游/下游记录 id |
| amount | 金额 |
| currency | `CNY` |
| occurredAt | 发生时间 |
| description | 备注 |
| status | `confirmed`/`pending` |

### 8.3 展示
- 表格列出 `type`, `amount`, `occurredAt`, `relatedId`, `description`, `status`。
- 提供时间范围筛选与金额区间。
- 显示汇总卡片：总收入、总支出、净利润。

## 9. H5落地页
### 9.1 内容
- 模拟移动端申请页面，字段与 CRM 客户一致，表单提交指向前端逻辑（模拟 API）并写入 `crm_customers`。
- 页面需包含来源渠道选择。

### 9.2 字段
| 字段 | 描述 |
| ---- | ---- |
| sourceChannel | string | 渠道名称 |
| name | string | 姓名 |
| phone | string | 手机号 |
| city | string | 城市 |
| amount | number | 额度 |
| remark | string | 补充信息 |

### 9.3 管理页
- H5落地页管理页面列出已生成的 landing 记录（localStorage 键 `crm_landing_pages`）。
- 字段包括 `id`, `title`, `url`, `status`, `createdAt`, `updatedAt`, `linkedUpstreamId`。
- 提供“预览”链接、停用/启用操作。

## 10. 销售统计
### 10.1 内容
- 只读视图，汇总下游客户的交付情况，包括分发成功率与收入。
- 使用 `crm_distributions`, `crm_financials` 统计。

### 10.2 字段
| 字段 | 描述 |
| ---- | ---- |
| downstreamId | 下游客户 id |
| deliveredCount | 成功分发条数 |
| failedCount | 失败条数 |
| successRate | `delivered/(delivered+failed)` |
| revenue | 收入 |
| averagePrice | 平均单价 |
| lastDeliveryAt | 最近一次分发时间 |

### 10.3 图表
- 展示“下游排名”柱状图（收入/交付量）和“成功率趋势”折线图。

## 11. 采购管理
### 11.1 目标
- 展示上游渠道采购总结，与成本相关的关键指标。

### 11.2 字段
| 字段 | 描述 |
| ---- | ---- |
| upstreamId | 渠道 id |
| totalLeads | 已采购条数 |
| totalCost | 总成本 |
| averageCost | 单条平均成本 |
| lastPurchaseAt | 最近采购时间 |
| status | `active`/`inactive` |

### 11.3 展示
- 表格展示上述字段，提供筛选（渠道、状态）和排序（成本、数量）。
- 卡片展示采购总成本和单日增长。

## 12. 通用规则
- 所有 CRUD 表单必须提供表单校验（必填/格式）。
- 列表需提供分页与全局搜索。
- 所有本地存储集合初始化为空数组，以防未登录情况下访问。
- 每次提交/更新写入 `updatedAt` 字段。
- 所有操作要合理提示/弹窗。

