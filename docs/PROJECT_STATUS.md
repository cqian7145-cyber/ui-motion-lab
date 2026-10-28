# UI Motion Lab V0.1

Task UI-001, 2026-10-28 (Asia/Shanghai). Delivery and verification record:
[UI-001-REPORT.md](tasks/UI-001-REPORT.md).

The original ZIP remains the implementation baseline. All 10 components, gallery,
playground and source generator remain. No new application was scaffolded.

Local root: `D:\ui-motion-lab\ui-motion-lab`.

```powershell
Set-Location D:\ui-motion-lab\ui-motion-lab
$env:npm_config_cache = "$PWD\.npm-cache"
npm ci --no-audit --no-fund
npm run generate:sources
npm run check
npm run dev -- -p 3001
```

Port 3000 belongs to another project and was left untouched. Lockfile installation
and CI both use npm ci. The report separates actual Chromium checks from physical
hardware, Firefox/WebKit and screen-reader work. This is a local component lab,
not a production package. Original syntax-only preflight claims are superseded by
the Windows evidence in the report. No blanket dependency upgrade was performed.
