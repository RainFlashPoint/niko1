const puppeteer = require('puppeteer');

const pages = [
  { url: 'http://localhost:5183', name: '1-dashboard', title: '仪表盘' },
  { url: 'http://localhost:5183/#/purchase', name: '2-purchase', title: '流量采购' },
  { url: 'http://localhost:5183/#/distribute', name: '3-distribute', title: '流量分发' },
  { url: 'http://localhost:5183/#/sales', name: '4-sales', title: '流量销售' },
  { url: 'http://localhost:5183/#/product', name: '5-product', title: '产品中心' },
  { url: 'http://localhost:5183/#/report', name: '6-report', title: '数据报表' },
  { url: 'http://localhost:5183/#/finance', name: '7-finance', title: '财务管理' },
  { url: 'http://localhost:5183/#/landing', name: '8-landing', title: 'H5落地页' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const p of pages) {
    console.log(`📸 截图: ${p.title}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ 
      path: `/Users/hongzhi/traffic-platform/screenshots/${p.name}.png`,
      fullPage: true 
    });
    await page.close();
  }

  await browser.close();
  console.log('✅ 截图完成！');
})();
