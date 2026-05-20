const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const artifactDir = 'C:\\Users\\WIN\\.gemini\\antigravity-ide\\brain\\04751e68-34df-4b04-ae3b-0cd696b998e5';
  
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  try {
    console.log('Navigating to http://localhost:5173/menu...');
    await page.goto('http://localhost:5173/menu', { waitUntil: 'networkidle' });
    
    console.log('Waiting for dish cards...');
    await page.waitForSelector('.dish-card-premium-kiosk');
    
    console.log('Opening the first dish card...');
    const cards = await page.$$('.dish-card-premium-kiosk');
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForSelector('.book-detail-container', { state: 'visible' });
      await page.waitForTimeout(1500);
      
      const nextBtn = await page.$('.next-page');
      if (nextBtn) {
        console.log('Clicking Next Page button...');
        await nextBtn.click();
        
        // Take screenshots at multiple intervals during the flip
        await page.waitForTimeout(200);
        const flippingPageHTML = await page.evaluate(() => {
          const el = document.querySelector('.middle-flipping-page');
          const leftPage = document.querySelector('.left-page');
          const rightPage = document.querySelector('.right-page');
          
          const getPageDetails = (pageEl) => {
            if (!pageEl) return 'NOT FOUND';
            const img = pageEl.querySelector('.book-main-img');
            const title = pageEl.querySelector('.detail-title-large');
            return {
              html: pageEl.outerHTML.substring(0, 300) + '...',
              imgSrc: img ? img.getAttribute('src') : null,
              titleText: title ? title.innerText : null
            };
          };

          if (!el) return { el: 'NOT FOUND', leftPage: getPageDetails(leftPage), rightPage: getPageDetails(rightPage) };
          const inner = el.querySelector('.flipping-inner');
          const front = el.querySelector('.flipping-page-front');
          const back = el.querySelector('.flipping-page-back');
          const img = back ? back.querySelector('.book-main-img') : null;
          
          return {
            leftPage: getPageDetails(leftPage),
            rightPage: getPageDetails(rightPage),
            el: {
              width: el.offsetWidth,
              height: el.offsetHeight,
              style: el.getAttribute('style'),
              computedTransform: window.getComputedStyle(el).transform,
              computedDisplay: window.getComputedStyle(el).display
            },
            inner: inner ? {
              width: inner.offsetWidth,
              height: inner.offsetHeight,
              style: inner.getAttribute('style'),
              computedTransform: window.getComputedStyle(inner).transform,
              computedDisplay: window.getComputedStyle(inner).display
            } : null,
            front: front ? {
              width: front.offsetWidth,
              height: front.offsetHeight,
              style: front.getAttribute('style'),
              computedTransform: window.getComputedStyle(front).transform,
              computedDisplay: window.getComputedStyle(front).display,
              computedOpacity: window.getComputedStyle(front).opacity,
              computedBackfaceVisibility: window.getComputedStyle(front).backfaceVisibility || window.getComputedStyle(front).webkitBackfaceVisibility
            } : null,
            back: back ? {
              width: back.offsetWidth,
              height: back.offsetHeight,
              style: back.getAttribute('style'),
              computedTransform: window.getComputedStyle(back).transform,
              computedDisplay: window.getComputedStyle(back).display,
              computedOpacity: window.getComputedStyle(back).opacity,
              computedBackfaceVisibility: window.getComputedStyle(back).backfaceVisibility || window.getComputedStyle(back).webkitBackfaceVisibility
            } : null,
            img: img ? {
              width: img.offsetWidth,
              height: img.offsetHeight,
              style: img.getAttribute('style'),
              computedTransform: window.getComputedStyle(img).transform,
              computedDisplay: window.getComputedStyle(img).display,
              computedBackfaceVisibility: window.getComputedStyle(img).backfaceVisibility || window.getComputedStyle(img).webkitBackfaceVisibility
            } : null
          };
        });
        console.log('Flipping Page Child Elements at 200ms:', JSON.stringify(flippingPageHTML, null, 2));
        await page.screenshot({ path: path.join(artifactDir, 'browser_modal_flip_200ms.png') });
        console.log('Saved browser_modal_flip_200ms.png');
        
        await page.waitForTimeout(200);
        await page.screenshot({ path: path.join(artifactDir, 'browser_modal_flip_400ms.png') });
        console.log('Saved browser_modal_flip_400ms.png');
        
        await page.waitForTimeout(200);
        await page.screenshot({ path: path.join(artifactDir, 'browser_modal_flip_600ms.png') });
        console.log('Saved browser_modal_flip_600ms.png');
        
        await page.waitForTimeout(600);
        await page.screenshot({ path: path.join(artifactDir, 'browser_modal_flip_done.png') });
        console.log('Saved browser_modal_flip_done.png');
      }
    }
  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
