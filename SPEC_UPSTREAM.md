# 上游渠道管理 - 需求规格说明 (SPEC)

## 页面描述
上游渠道管理页用于展示由上游渠道推送的流量数据列表。页面仅支持查看与分页浏览，不提供新增、编辑、删除等写操作。数据来源为前端 `localStorage` 中缓存的上游推送数据。

## 数据字段（上游推送的流量数据）
以下为列表展示所需字段与说明（字段名为前端使用的键名）：

- `id`：数据唯一标识（字符串或数字，必填）
- `channelName`：上游渠道名称（字符串，必填）
- `channelCode`：上游渠道编码（字符串，必填）
- `pushTime`：推送时间（ISO 8601 字符串或时间戳，必填）
- `leadName`：线索姓名（字符串，可选）
- `leadPhone`：线索手机号（字符串，可选）
- `leadSource`：线索来源（字符串，可选）
- `productName`：产品名称（字符串，可选）
- `region`：地域/省市（字符串，可选）
- `status`：流量状态（字符串，可选，如：`new`/`processed`/`invalid`）
- `remark`：备注（字符串，可选）

> 说明：字段可根据实际推送结构扩展，但需保证 `id`、`channelName`、`channelCode`、`pushTime` 可用以满足基础展示与排序需求。

## 界面布局

- 顶部：页面标题“上游渠道管理”
- 主体：数据表格
  - 表头按字段展示（建议展示：`id`、`channelName`、`channelCode`、`pushTime`、`leadName`、`leadPhone`、`productName`、`region`、`status`）
  - 表格为只读模式，不显示“编辑”“删除”等操作列
  - 空数据时显示空态（如“暂无数据”）
- 底部：分页组件
  - 展示当前页码、总条数、每页条数
  - 支持页码切换

## 分页逻辑

- 采用前端分页：一次性从 `localStorage` 读取全量数据后在前端进行切片展示
- 数据存储键名：`upstream_leads`
- `localStorage` 中数据格式：JSON 数组
- 分页参数：
  - `pageSize`：每页条数（默认 10，可配置）
  - `currentPage`：当前页（默认 1）
- 计算方式：
  - `total = data.length`
  - `start = (currentPage - 1) * pageSize`
  - `end = start + pageSize`
  - `pageData = data.slice(start, end)`
- 当 `currentPage` 超出最大页时，自动回退到最后一页

## 验收标准

1. 页面能正确从 `localStorage` 读取键名为 `upstream_leads` 的数据并展示
2. 列表内容与字段映射正确，包含至少 `id`、`channelName`、`channelCode`、`pushTime`
3. 页面无任何新增、编辑、删除入口或功能
4. 分页组件可用，切换页码后列表数据随之更新
5. 空数据时显示空态提示，无报错
6. 刷新页面后依旧从 `localStorage` 读取数据并正确展示
