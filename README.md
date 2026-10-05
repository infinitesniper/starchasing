# 今夜望星

轻量、中文、无需后端的观星计划工具。复用 MIT 开源 Astronomy Engine，依赖已随项目内置，不访问 CDN，无需 API Key；计算在浏览器本地完成。

## 本地运行

最简单：双击 `dist/index.html` 即可使用（定位功能可能受浏览器限制）。

推荐在项目目录运行：

```sh
python -m http.server 8000 --directory dist
```

打开 http://localhost:8000 。Windows 也可用 `py -m http.server 8000 --directory dist`。

## GitHub Pages

将项目推送到 GitHub 仓库的 `main` 分支，在 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。内置 `.github/workflows/pages.yml` 会先测试、再发布 `dist`。

无需构建、npm install 或服务器。也可直接选择 Deploy from a branch，但需要把 dist 内容放到所选发布根目录；推荐使用现有 Actions 工作流。

## 功能

- 城市预设、自定义经纬度、固定 UTC 时差、浏览器定位
- 月相、天文黑夜、日月行星、亮星与精选深空目标
- 肉眼/双筒/天文望远镜模式、类型筛选
- 最佳时刻、方位、观测时间窗口、整夜高度图、红光界面
- 本地保存地点与器材偏好；不上传定位

## 精度与边界

计算区间为所选日期本地中午至次日中午，10 分钟采样。默认北京仅为初始预设，不代表识别了用户位置。时差手动指定，海外夏令时须按目标日期核对（悉尼默认标准 UTC+10）。

候选门槛：目标高度至少 20°；月亮/行星要求太阳低于 −6°，恒星/深空要求低于 −12°。天文黑夜单独按太阳 −18°计算。时间窗口是采样近似，不是精确升落时刻。排序是高度、类型和月光的启发式规则，不保证实际可见。无天气、云量、光污染与障碍物数据。

固定目标是精简手工目录，坐标为近似 J2000，包含岁差/章动转换、不含恒星自行；适合认星与观测安排，不能用于精密指向。星等是点源或总亮度参考，不能代替面亮度。肉眼模式隐藏 diffuse 深空目标，但仍显示易观测的星团。

## 测试

Node.js 18+（推荐 22）：

```sh
node --test tests/*.test.cjs
```

涵盖 UTC 日期、非法输入、推荐门槛、极昼极夜、固定星与 Astronomy Engine 星位置交叉检查。

## 复用与许可

应用代码 MIT，见 LICENSE。天文计算复用 [cosinekitty/astronomy](https://github.com/cosinekitty/astronomy) 的浏览器库，未修改。上游许可证见 `dist/vendor/LICENSE.txt`，来源及 SHA256 见 `THIRD_PARTY.md`。下载日期：2026-10-05。

## 星空文化与资料库

可切换现代国际星座和中国传统星官。精选资料库包含 25 个目标，12 颗亮星具有双体系名称对照；传统星官不与现代星座一一对应。其余目标保留现代目录名称，不虚构传统归属。本版没有全天星官连线。文化选择保存在本机，不改变天体位置或推荐排序。

名称资料取自 D3-Celestial `starnames.json` 和 `starnames.cn.json`（BSD-3-Clause），使用 HIP 编号对齐，抽取字段存于 `dist/cultures.js`。扩展其他文化时添加有明确来源和许可证的映射，并保持目标 ID 不变。
