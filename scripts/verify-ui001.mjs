// Optional QA runner: use an existing Playwright installation (no app dependency).
// UI001_PLAYWRIGHT_PATH may name its package directory; UI001_CHROME_PATH may
// select an already installed Chromium executable. Start `npm run dev -p` first.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.UI001_PLAYWRIGHT_PATH || "playwright");
const out=path.join(root,"output/playwright/final");
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:process.env.UI001_HEADED!=="1",...(process.env.UI001_CHROME_PATH?{executablePath:process.env.UI001_CHROME_PATH}:{})});
const context=await browser.newContext({viewport:{width:1440,height:900},permissions:["clipboard-read","clipboard-write"]});
const page=await context.newPage();
page.setDefaultTimeout(8000);
const errors=[],results=[];
page.on("pageerror",e=>errors.push(String(e)));
page.on("console",msg=>{if(msg.type()==="error")errors.push(msg.text());});
const url=process.env.UI001_URL || "http://localhost:3001";
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const names=["Motion Button","Magnetic Button","Reveal Text","Morph Card","Stagger List","Animated Tabs","Scroll Reveal","Bottom Sheet","Animated Toast","Page Transition"];
async function open(name){
  await page.getByRole("button",{name:`Inspect ${name}`,exact:true}).click();
  const d=page.getByRole("dialog",{name:`${name} component playground`,exact:true});
  await d.waitFor();return d;
}
async function close(){await page.keyboard.press("Escape");await page.locator("dialog[open]").waitFor({state:"detached"});}
async function check(name,fn){
  try{const evidence=await fn();results.push({name,status:"PASS",evidence});console.log(`PASS ${name}`);}
  catch(e){results.push({name,status:"PARTIAL",error:String(e)});console.error(`PARTIAL ${name}: ${e}`);await page.screenshot({path:path.join(out,`failure-${results.length}.png`)});await page.reload();}
}
async function range(locator,steps){await locator.focus();await page.keyboard.press("Home");for(let i=0;i<steps;i++)await page.keyboard.press("ArrowRight");}
const transform=locator=>locator.evaluate(e=>getComputedStyle(e).transform);
try{
  await page.goto(url);
  await check("gallery-search-categories",async()=>{
    assert.equal(await page.locator("article").count(),10);
    const search=page.getByRole("textbox",{name:"Search components"});
    await search.fill("magnetic");assert.equal(await page.locator("article").count(),1);
    await search.fill("nonexistent xyz");await page.getByText("No components found").waitFor();
    await page.getByRole("button",{name:"Clear filters"}).click();
    const counts={};
    for(const [category,count] of Object.entries({Buttons:2,Typography:1,Cards:2,Navigation:3,Scroll:1,Feedback:1,All:10})){
      await page.locator(".lab-pill").filter({hasText:new RegExp(`^${category}$`)}).click();
      counts[category]=await page.locator("article").count();assert.equal(counts[category],count);
    }return counts;
  });
  await check("motion-button-controls",async()=>{
    const d=await open("Motion Button"),b=d.getByRole("button",{name:"Get started"});
    await b.hover();await sleep(400);const hover=await transform(b);assert.notEqual(hover,"none");
    await page.mouse.down();await sleep(180);const tap=await transform(b);await page.mouse.up();assert.notEqual(tap,hover);
    await d.locator("#accent-color").fill("#ff5500");assert.equal(await b.evaluate(e=>getComputedStyle(e).backgroundColor),"rgb(255, 85, 0)");
    await range(d.locator("#preview-scale"),7);assert.equal(await d.locator(".preview-grid > div").evaluate(e=>e.style.transform),"scale(1.15)");
    const spring=[];
    for(const n of [0,53]){await range(d.locator("#spring-stiffness"),n);await page.mouse.move(750,800);await sleep(500);await b.hover();await sleep(50);spring.push(await transform(b));}
    assert.notEqual(spring[0],spring[1]);
    await d.getByLabel("Disabled button").check();assert(await b.isDisabled());await b.hover({force:true});await sleep(300);assert.equal(await transform(b),"none");
    await d.getByLabel("Disabled button").uncheck();assert(await b.isEnabled());
    await d.getByLabel("Simulate reduced motion").check();await b.hover();await sleep(150);assert.equal(await transform(b),"none");
    await close();return {hover,tap,spring};
  });
  await check("magnetic-pointer-return",async()=>{
    const d=await open("Magnetic Button"),b=d.getByRole("button",{name:"Explore work"});await b.hover();await sleep(450);
    const r=await b.boundingBox();await page.mouse.move(r.x+r.width-8,r.y+r.height/2,{steps:4});await sleep(500);
    const moved=await transform(b);assert.notEqual(moved,"none");await page.mouse.move(750,800);await sleep(900);
    const reset=await transform(b);assert(reset==="none" || Math.abs(Number(reset.split(",")[4]))<.1);
    await close();return {moved,reset};
  });
  await check("reveal-replay-speed",async()=>{
    const d=await open("Reveal Text"),token=d.locator(".preview-grid span[aria-label] span span").first(),samples=[];
    for(const n of [0,15]){await range(d.locator("#motion-speed"),n);await d.getByRole("button",{name:"Replay"}).click();await sleep(180);samples.push(await transform(token));}
    assert.notEqual(samples[0],samples[1]);await sleep(700);assert.equal(await transform(token),"none");await close();return samples;
  });
  await check("stagger-list-sequence",async()=>{
    const d=await open("Stagger List");await d.getByRole("button",{name:"Replay"}).click();await sleep(70);
    const early=await d.locator(".preview-grid li").evaluateAll(es=>es.map(e=>Number(getComputedStyle(e).opacity)));assert(early[0]>early[2]);
    await sleep(900);assert((await d.locator(".preview-grid li").evaluateAll(es=>es.map(e=>getComputedStyle(e).opacity))).every(x=>x==="1"));await close();return early;
  });
  await check("animated-tabs-keyboard",async()=>{
    const d=await open("Animated Tabs"),tabs=d.getByRole("tab");await tabs.nth(1).click();assert.equal(await tabs.nth(1).getAttribute("aria-selected"),"true");
    await page.keyboard.press("ArrowRight");assert.equal(await tabs.nth(2).getAttribute("aria-selected"),"true");
    await page.keyboard.press("Home");assert.equal(await tabs.nth(0).getAttribute("aria-selected"),"true");assert((await d.getByRole("tabpanel").innerText()).includes("Clarity in motion"));await close();
  });
  await check("scroll-reveal-wheel",async()=>{
    const d=await open("Scroll Reveal"),r=d.getByLabel("Scrollable animation demonstration");await r.hover();await page.mouse.wheel(0,250);await sleep(900);
    const data=await r.evaluate(e=>({scroll:e.scrollTop,opacity:Array.from(e.children).slice(1,4).map(x=>getComputedStyle(x).opacity)}));assert(data.scroll>0);assert(data.opacity.includes("1"));await close();return data;
  });
  for(const [name,trigger,label] of [["Morph Card","Open detailed card","Case study detail"],["Bottom Sheet","Open bottom sheet","Demo bottom sheet"]]){
    await check(`${name}-modal-keyboard-focus`,async()=>{
      const d=await open(name),t=d.getByRole("button",{name:trigger,exact:true});await t.focus();await page.keyboard.press("Enter");
      const inner=page.getByRole("dialog",{name:label,exact:true});await inner.waitFor();assert(await inner.evaluate(e=>e.contains(document.activeElement)));
      for(const key of ["Tab","Tab","Tab","Shift+Tab","Shift+Tab"]){await page.keyboard.press(key);assert(await inner.evaluate(e=>e.contains(document.activeElement)));}
      await page.keyboard.press("Escape");await inner.waitFor({state:"detached"});assert(await d.isVisible());assert(await t.evaluate(e=>e===document.activeElement));
      await page.keyboard.press("Space");await inner.waitFor();await inner.getByRole("button",{name:"Close",exact:true}).click();await inner.waitFor({state:"detached"});
      await close();assert(await page.getByRole("button",{name:`Inspect ${name}`,exact:true}).evaluate(e=>e===document.activeElement));
    });
  }
  await check("bottom-sheet-drag-dismiss",async()=>{
    const d=await open("Bottom Sheet");await d.getByRole("button",{name:"Open bottom sheet",exact:true}).click();const inner=page.getByRole("dialog",{name:"Demo bottom sheet",exact:true});await sleep(500);
    const r=await inner.locator(".h-1\\.5").boundingBox();await page.mouse.move(r.x+r.width/2,r.y+3);await page.mouse.down();await page.mouse.move(r.x+r.width/2,r.y+160,{steps:12});await page.mouse.up();await inner.waitFor({state:"detached"});await close();
  });
  await check("toast-show-dismiss",async()=>{
    const d=await open("Animated Toast");await d.getByRole("button",{name:"Show notification"}).click();await d.getByRole("status").waitFor();await d.getByRole("button",{name:"Dismiss notification"}).click();await d.getByRole("status").waitFor({state:"detached"});await close();
  });
  await check("page-transition-cycle",async()=>{
    const d=await open("Page Transition");for(const title of ["Create","Share","Discover"]){await d.getByRole("button",{name:"Next",exact:true}).click();await d.getByRole("heading",{name:title,exact:true}).waitFor();}await close();
  });
  await check("ten-source-usage-clipboard",async()=>{
    for(const name of names){const d=await open(name);await d.getByRole("button",{name:"Source Code",exact:true}).click();const source=await d.locator("pre code").innerText(),filename=await d.locator(".break-all").innerText();assert.equal(source,fs.readFileSync(path.join(root,filename),"utf8"));
      await d.getByRole("button",{name:"Copy source",exact:true}).click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,"\n"),source);
      await d.getByRole("button",{name:"Usage & Props",exact:true}).click();assert(await d.locator("table tbody tr").count()>0);const usage=await d.locator("pre code").innerText();await d.getByRole("button",{name:"Copy",exact:true}).click();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,"\n"),usage);await close();
    }return names;
  });
  await check("system-reduced-motion-ten-panels",async()=>{
    await page.emulateMedia({reducedMotion:"reduce"});await page.reload();
    for(const name of names){const d=await open(name);if(name==="Motion Button"||name==="Magnetic Button"){const b=d.getByRole("button",{name:name==="Motion Button"?"Get started":"Explore work"});await b.hover();await sleep(150);assert.equal(await transform(b),"none");}await close();}
    await page.emulateMedia({reducedMotion:"no-preference"});
    const live=await open("Motion Button"),button=live.getByRole("button",{name:"Get started"});
    await button.hover();await sleep(400);assert.notEqual(await transform(button),"none");
    await page.emulateMedia({reducedMotion:"reduce"});await sleep(150);assert.equal(await transform(button),"none");
    await close();await page.emulateMedia({reducedMotion:"no-preference"});await page.reload();return names;
  });
  await check("responsive-gallery-dialogs-props-four-widths",async()=>{
    const dimensions=[];
    for(const width of [1440,768,390,320]){
      await page.setViewportSize({width,height:850});await page.getByRole("heading",{name:/Interfaces that/}).scrollIntoViewIfNeeded();await sleep(350);
      const size=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));assert(size.scroll<=width+1);dimensions.push(size);await page.screenshot({path:path.join(out,`gallery-${width}.png`),fullPage:true});
      for(const [name,trigger,label] of [["Morph Card","Open detailed card","Case study detail"],["Bottom Sheet","Open bottom sheet","Demo bottom sheet"]]){
        const d=await open(name);await d.getByRole("button",{name:trigger,exact:true}).click();const inner=page.getByRole("dialog",{name:label,exact:true});await sleep(550);assert(await inner.evaluate(e=>e.scrollWidth<=e.clientWidth+1));await page.screenshot({path:path.join(out,`${name.replaceAll(" ","-")}-${width}.png`)});
        await page.keyboard.press("Escape");await inner.waitFor({state:"detached"});await d.getByRole("button",{name:"Usage & Props",exact:true}).click();assert(await d.locator("section").evaluate(e=>e.scrollWidth<=e.clientWidth+1));await close();
      }
    }return dimensions;
  });
  await check("touch-fallback-and-filter",async()=>{
    const mobile=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true}),p=await mobile.newPage();
    try{await p.goto(url);await p.getByRole("button",{name:"Toggle filters"}).tap();await p.locator(".lab-pill").filter({hasText:/^Buttons$/}).tap();assert.equal(await p.locator("article").count(),2);await p.getByRole("button",{name:"Inspect Magnetic Button"}).tap();const b=p.getByRole("dialog").getByRole("button",{name:"Explore work"});await b.tap();await sleep(350);assert.equal(await transform(b),"none");}finally{await mobile.close();}
  });
  await check("settled-idle-layout-sample",async()=>{
    await page.mouse.move(0,0);await sleep(1200);
    const cdp=await context.newCDPSession(page);await cdp.send("Performance.enable");
    const before=(await cdp.send("Performance.getMetrics")).metrics;
    await sleep(500);const after=(await cdp.send("Performance.getMetrics")).metrics;
    const delta={};for(const name of ["LayoutCount","RecalcStyleCount"]){delta[name]=after.find(x=>x.name===name).value-before.find(x=>x.name===name).value;}
    await cdp.detach();return delta;
  });
  await check("runtime-console-errors",()=>{assert.deepEqual(errors,[]);return errors;});
}finally{
  const summary={status:results.every(r=>r.status==="PASS")?"PASS":"PARTIAL",browser:browser.version(),url,results,errors};
  fs.writeFileSync(path.join(out,"results.json"),JSON.stringify(summary,null,2)+"\n");
  await browser.close();if(summary.status!=="PASS")process.exitCode=1;
}
