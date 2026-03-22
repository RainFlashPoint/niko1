#!/usr/bin/env python3
"""Markdown 转 PDF - 支持中文"""

import re
from fpdf2 import FPDF

# 读取 Markdown 文件
with open('API文档.md', 'r', encoding='utf-8') as f:
    content = f.read()

# 简单处理
content = content.replace('```json', '\n```json')
content = content.replace('```javascript', '\n```javascript')
content = content.replace('```python', '\n```python')
content = content.replace('```bash', '\n```bash')

# PDF 生成
pdf = FPDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=10)

# 标题
pdf.set_font("Helvetica", 'B', 16)
pdf.cell(0, 10, "API Interface Document", ln=True, align='C')
pdf.ln(5)

# 使用等宽字体
pdf.set_font("Courier", size=9)

# 按行处理
for line in content.split('\n'):
    line = line.strip()
    if not line:
        pdf.ln(3)
        continue
    
    # 处理标题
    if line.startswith('# '):
        pdf.set_font("Helvetica", 'B', 14)
        pdf.ln(5)
        pdf.cell(0, 8, line[2:], ln=True)
        pdf.set_font("Courier", size=9)
    elif line.startswith('## '):
        pdf.set_font("Helvetica", 'B', 12)
        pdf.ln(4)
        pdf.cell(0, 7, line[3:], ln=True)
        pdf.set_font("Courier", size=9)
    elif line.startswith('### '):
        pdf.set_font("Helvetica", 'B', 10)
        pdf.ln(3)
        pdf.cell(0, 6, line[4:], ln=True)
        pdf.set_font("Courier", size=9)
    elif line.startswith('|'):
        # 表格行
        pdf.cell(0, 5, line[:100], ln=True)
    elif line.startswith('```'):
        pdf.set_font("Courier", size=8)
        pdf.ln(2)
    else:
        # 普通文本，截断到合理长度
        line = line[:120]
        try:
            pdf.cell(0, 5, line, ln=True)
        except:
            pass

pdf.output('API文档-对外版.pdf')
print('PDF OK: API文档-对外版.pdf')
