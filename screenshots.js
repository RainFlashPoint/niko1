import puppeteer from 'puppeteer';

const pages = [
  { url: 'http://localhost:5180', name: '1-dashboard', title: '仪表盘' },
  { url: 'http://localhost:5180/#/purchase', name: '2-purchase', title: '流量采购' },
  { url: 'http://localhost:5180/#/sales', name: '3-sales', title: '流量销售' },
  { url: 'http://localhost:5180/#/report', name: '4-report', title: '数据报表' },
  { url: 'http://localhost:5180/#/finance', name: '5-finance', title: '财务管理' },
  { url: 'http://localhost:5180/#/landing', name: '6-landing', title: 'H5落地页' },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

for (const page of pages) {
  console.log(`📸 截图: ${page.title}`);
  await page.goto(page.url, { waitUntil: 'networkidle2' });
  await page.screenshot({ 
    path: `/Users/hongzhi/traffic-platform/screenshots/${page.name}.png`,
    fullPage: true 
  });
}

await browser.close();
console.log('✅ 完成！');
