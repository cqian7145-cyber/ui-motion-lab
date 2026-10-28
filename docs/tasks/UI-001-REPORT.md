# Task UI-001 执行报告

- 状态：PARTIAL（本地验收通过，待完成 Git 推送）
- 日期：2026-10-28，Asia/Shanghai
- 本地工作路径：D:\ui-motion-lab\ui-motion-lab
- 唯一基线：用户已解压的 V0.1；没有重建工程，没有开发 V0.2。

## 1. 只读审计

阅读 AGENTS.md、README、package/tsconfig/next 配置、三份指定项目文档、源码生成脚本和 CI。
结构为 src/app（页面/样式）、src/components/lab（画廊/目录/Demo）、
src/components/motion（10 个组件）、src/generated（10 份 TSX 字符串）、src/lib。
10 个文件均有真实实现及 Demo 分支；Source 从文件自动生成，并非手工伪造源码。

开始时无 node_modules、package-lock.json 或 .git；git status 返回非仓库。
Node v24.22.1 / npm 11.19.1 / Git 2.52.0.windows.1。远程 ls-remote 实测为空。
3000 被其他项目占用，未终止该进程。本项目使用 3001。
原有文档只声明容器内语法解析，明确未安装/构建/浏览器验证，未将历史声明当作验收。

保留 Next 16.3.5、React 19.2.4 和原 package.json 范围；lockfile 解析 Motion 12.43.0、
Tailwind 4.3.3、TypeScript 5.9.3。未批量升级依赖或添加新的运行依赖。

## 2. 缺陷与修复

| 优先级 | 实际问题 | 修复文件与结果 |
| --- | --- | --- |
| P0 | Demo 读取未定义 color/stiffness；5 个 TS 错误，首页运行异常，build 失败 | lab/demo.tsx 声明并传递参数 |
| P1 | 打开弹层焦点仍在触发按钮；无焦点限制/恢复；Escape 关闭两层 | ui/modal.tsx、两个模态组件及 lab/motion-lab.tsx 使用原生 dialog/top layer；补充 Tab 边界和 React 卸载恢复 |
| P1 | 模态嵌入预览 transform/overflow 容器，存在裁切/坐标风险 | 原生 top layer 及 globals.css；四档弹层实测 |
| P1 | OS 减弱动画首次加载时 SSR 与客户端样式不一致，控制台 hydration 警告 | lib/use-reduced-motion.ts 用 useSyncExternalStore 固定 SSR/hydration 快照，十组件及面板复用 |
| P1 | Hover 中切换禁用/减弱动画仍沿旧弹簧回弹 | motion-button.tsx 显式 resting 动画与零时长 transition；新增实际禁用预览开关 |
| P2 | Copy 定时器未清理，Props 容器可能裁切内容 | lab/motion-lab.tsx 清理 timeout、Props 横向滚动 |
| P2 | 两个匿名默认导出产生 lint 警告 | eslint/postcss 配置命名后导出，最终 lint 无警告 |
| P2 | 无 lockfile，CI npm install 不确定；文档路径少一层 | package-lock.json、CI 改 npm ci，README/状态文档更新 |
| P2 | 浏览器请求站点图标返回 404 | 新增原创 src/app/icon.svg |

Next dev 自动为 AGENTS.md 追加 Next.js agent rules，保留原规则与自动块；已阅读本地
node_modules/next/dist/docs 的 Server/Client Components 指南。没有改写原有规则。
所有动效组件仍在原文件路径，未批量重命名或重组工程。

## 3. 实际命令与结果

| 命令 | 结果 |
| --- | --- |
| Get-Location / node -v / npm -v / git --version / git status | 工作路径及版本如上，初始非 Git 仓库 |
| npm install --no-audit --no-fund | PASS，初始无 lockfile，安装 368 个包并保留 lockfile |
| npm run generate:sources | PASS，生成 10 份源码 |
| 首轮 npm run lint | 0 errors / 2 warnings，随后修复 |
| 首轮 npm run typecheck / npm run build | 5 处 TS 错误，build 失败；保留真实失败结论 |
| npm run dev -- -p 3001 | PASS，真实浏览器交互及截图；之后停止本项目进程以重新安装 |
| npm ci --no-audit --no-fund | PASS，按锁文件重新安装 368 个包 |
| 最终 npm run check | PASS，lint/typecheck/production build 全部 exit 0 |
| npm run start -- -p 3001 | PASS，最终回归使用构建后的稳定生产服务 |
| node scripts/verify-ui001.mjs | PASS，18/18；Chromium 153.0.8010.12；0 console/runtime/hydration errors。详见 UI-001-BROWSER-RESULTS.json |
| npm install-scripts ls / npm ls --depth=0 | 已核对，未安装额外应用依赖 |

所有 npm 安装使用项目内 .npm-cache。未升级 npm、修改系统 PATH 或绕过脚本策略。
安装提示 eslint@9.39.5 已停止支持，以及 unrs-resolver@1.12.2 postinstall 未被 allowScripts
覆盖；保留提示，未执行审批/放开未知脚本。当前 lint、类型与构建在该策略下通过。
未运行 npm audit（使用用户指定 --no-audit），不宣称完成安全漏洞审计。

## 4. 十组件验收

| 组件 | 当前状态 | 真实覆盖 |
| --- | --- | --- |
| Motion Button | PASS | Hover/Tap transform、禁用/启用、颜色、Spring 响应、速度、减弱动画 |
| Magnetic Button | PASS | 鼠标约 15px 位移、离开近零复位、触屏普通按钮降级 |
| Reveal Text | PASS | 初始位移到静止、Replay、0.5x/2x 速度差异 |
| Morph Card | PASS | 展开/按钮关闭、Escape、Enter/Space、焦点进入/循环/恢复、父面板保留 |
| Stagger List | PASS | 早期第一个 opacity 大于末项，最终全部 opacity=1 |
| Animated Tabs | PASS | 点击、ArrowRight、Home、aria-selected、内容和指示器 |
| Scroll Reveal | PASS | 真实 wheel 导致本地 scrollTop 增加，内容进入可见状态 |
| Bottom Sheet | PASS | 打开/关闭、拖动关闭、Escape、Enter/Space、焦点与嵌套行为 |
| Animated Toast | PASS | Show / Dismiss，status 出现与退出 |
| Page Transition | PASS | Discover → Create → Share → Discover 状态循环 |

画廊十卡片、搜索、空态/清除、分类计数 2/1/2/3/1/1 通过。
10 个 Inspect、Source Code/Usage/Props 均逐一访问。10 份 Source 逐字匹配实际文件；
源码和 Usage 均用真实系统剪贴板读取验证（仅归一 Windows CRLF）。
缩放实际应用 transform；颜色实际改变 computed background；Spring 与速度实际改变运动曲线。

## 5. 浏览器、响应式与无障碍证据

使用已有 Playwright 与已有 Chromium，不下载新浏览器或新增应用依赖。
先以可见窗口交互/截图，再用无界面真实 Chromium 跑可重复脚本；并非 jsdom 或静态阅读。
早期脚本出现过精确文本换行、Windows 剪贴板换行及浮点像素取整的断言差异，
也捕获真实禁用/减弱动画和 hydration 缺陷。最终脚本保留行为标准，以最终运行结果为准。

- 1440 / 768 / 390 / 320px：首页无横向页面溢出；两个模态均全屏遮罩、内容可用。
- Modal/Props 在窄屏可访问，表格使用局部横向滚动。
- 键盘 Tab/Shift+Tab/Enter/Space/Escape 实测；一层 Escape 只关闭顶部模态。
- 打开后焦点进入弹层，Tab 边界循环，关闭后回到触发按钮，再关闭面板回 Inspect。
- OS prefers-reduced-motion 通过浏览器媒体模拟；首次 hydration 和动态变化分别检查。
- Playground 减弱动画开关实际停止位移。触屏 hasTouch/isMobile 模拟下磁吸不跟手偏移。
- 触控按钮保持语义 button；小型关闭按钮最低 24px，部分未达 44px 舒适目标为 P2 优化。
- 检查了 timer/listener 清理：Copy timeout、media change 订阅、modal body scroll 和焦点恢复。
- 性能只做动态观察、位移/opacity 检查及静止 CDP LayoutCount/RecalcStyleCount 短采样；不是 FPS/低端设备基准。

本地截图：output/playwright/final/gallery-{1440,768,390,320}.png，
Morph-Card-{width}.png、Bottom-Sheet-{width}.png；该目录已忽略，不将缓存/测试产物提交。
可版本化验收摘要：docs/tasks/UI-001-BROWSER-RESULTS.json。
截图已独立目视检查：保留白/黑/蓝视觉，320px 卡片与弹层文字正常换行，主要操作可达。

## 6. 方案来源与许可证

采用原生 dialog，未添加 Radix Dialog 或其他运行依赖，也未手写庞大焦点系统。
参考 MDN 对 top-layer/modal 的说明，以及 Radix Dialog 的焦点功能作为评估对照。
减弱动画订阅按 React 官方 useSyncExternalStore 的 server snapshot 约束编写。
没有复制外站组件代码、品牌资产或图片；icon.svg 是本次原创几何图标。

- [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
- [React useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)

现有依赖 package.json 许可证核对：Next / React / Motion / Radix Slot 为 MIT，Lucide 为 ISC。
这些依赖的许可证不等于本项目自动采用相同许可证；未擅自为用户源码选择发布许可证。
组件转移时需复制 SSR-safe hook；两个模态还需复制 Modal helper 与对应 CSS，已更新页面说明和文档。

## 7. Git 交付

已确认初始无历史且远程为空，git init -b main 并配置用户指定 origin。
使用现有 Git 身份/凭据；不更改全局身份，不输出 Token，不强制推送。
正式基线提交/推送记录将在最终回归通过后补全。

## 8. 已知限制与 V0.2 候选

无物理手机、Firefox/WebKit、屏幕阅读器及正式 WCAG 审计；不声称这些已通过。
未做长时间低端设备性能基准或任意自定义数据全覆盖。Clipboard 错误反馈可进一步改善。
ESLint 9 支持状态和安装脚本提示已记录；后续单独评估有界升级，不阻断本次已通过的构建。

候选下一项：UI-002 跨浏览器/真实设备与屏幕阅读器复核、44px 触控目标、长文本边界、
依赖维护与源码许可证决策。仅记录候选，未实现 Registry、Storybook 或新增动效组件。
