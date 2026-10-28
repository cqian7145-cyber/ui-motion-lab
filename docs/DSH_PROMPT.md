# Paste into DSH Desktop (open the already-cloned Cuberto workspace)

你是前端动效逆向研究员。当前是**已有的 Cuberto 复刻项目**，不需要重新 clone，也不要修改 Moonlight 或 UI Motion Lab。

1. 检查项目 Git 状态、真实技术栈、路由、组件、动画库与浏览器能力。
2. 如存在 `.agents/skills/clone-website/SKILL.md`，完整阅读，并阅读它的 references。
3. 对照 `https://cuberto.com/` 与本地复刻页面：桌面 1440px、手机 390px、关键滚动和 hover 状态。
4. 优先研究 Magnetic Button、Reveal Text、Scroll Reveal 三类交互，分析 trigger/state/timing/easing、组件文件路径、依赖和 touch/keyboard 降级。
5. 不确定的参数注明“估计”，没有真实浏览器检查的注明“未验证”。
6. 不迁移 Logo、素材、原文案、商业图像或未经授权的源代码。
7. 输出 `docs/design-transfer/reference-audit.md`、`motion-spec.md`、`component-candidates.md` 和标注视口的截图。
8. 仅创建研究成果，不重构现有网站；避免在其他工作区写文件。

报告完成后，由我手动将可用的研究文件复制到 `D:\ui-motion-lab\references\cuberto\`，再在 UI Motion Lab 中创建或调整原始实现。
