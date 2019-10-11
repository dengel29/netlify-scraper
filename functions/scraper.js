import { puppeteer as _puppeteer, args as _args, defaultViewport as _defaultViewport, executablePath as _executablePath, headless as _headless } from 'chrome-aws-lambda';
// import puppeteer from 'puppeteer-core';

export async function handler(event, context) {
  // your server-side functionality

  let result = null;
  let browser = null;

  try {
    browser = await _puppeteer.launch({
      args: _args,
      defaultViewport: _defaultViewport,
      executablePath: await _executablePath,
      headless: _headless,
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