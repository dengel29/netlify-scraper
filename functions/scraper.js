const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async (event, context) => {
  // your server-side functionality

  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
 
    let page = await browser.newPage();
 
    await page.goto(event.url || 'https://store.steampowered.com/search/?sort_by=Released_DESC&ignore_preferences=1&category1=998');
 
    result = await page.title();
  } catch (error) {
    return context.fail(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
 
  return context.succeed(result);
}