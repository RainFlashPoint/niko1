# 技术方案（上游渠道管理）

## 技术选型
- 前端框架：Vue 3
- UI 组件库：Element Plus
- 数据来源：`localStorage`

## 数据存储方式
- 读取键名：`upstream_leads`
- 数据格式：JSON 数组
- 页面初始化时一次性读取全量数据，保存在内存状态中，用于前端分页切片
- 刷新页面重新从 `localStorage` 读取，确保展示一致

## 组件结构
- `UpstreamChannelPage`
  - 负责读取 `localStorage`、管理分页状态、计算当前页数据
  - 包含：
    - 页面标题
    - `el-table` 数据表格（只读，无操作列）
    - `el-empty` 空态
    - `el-pagination` 分页

## 分页实现方式
- 前端分页，计算方式：
  - `total = data.length`
  - `start = (currentPage - 1) * pageSize`
  - `end = start + pageSize`
  - `pageData = data.slice(start, end)`
- 当 `currentPage` 超出最大页时，自动回退到最后一页
- 分页组件展示：当前页、总条数、每页条数，支持页码切换

