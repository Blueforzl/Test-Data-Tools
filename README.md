# 随机测试数据生成器

一个基于 Vue 3 + Vite 开发的 uTools 插件,用于快速生成各类测试数据。采用现代 Glassmorphism(毛玻璃)设计风格,界面美观、交互流畅。

## ✨ 功能特性

### 数据生成
- 👤 **姓名** - 随机生成中文姓名
- 📱 **手机号** - 随机生成中国大陆手机号(13/14/15/17/18/19号段)
- 📧 **邮箱** - 随机生成邮箱地址(支持主流邮箱域名)
- 😊 **昵称** - 随机生成趣味昵称
- 🪪 **身份证** - 随机生成身份证号码
- 💳 **银行卡** - 随机生成银行卡号
- 📍 **地址** - 随机生成中文地址

### 交互功能
- 🔄 **单个刷新** - 点击刷新按钮重新生成单条数据
- 🔄 **全部刷新** - 一键刷新所有数据
- 📋 **快速复制** - 点击数据区域或复制按钮,一键复制到剪贴板
- 📂 **文件读取** - 支持选择并查看文件内容
- 💾 **文件写入** - 支持保存文本和图片文件

### 设计特色
- 🎨 **现代毛玻璃风格** - Glassmorphism 设计语言
- 🌗 **深色主题适配** - 自动跟随系统主题
- ⚡ **流畅动画** - 60fps 交互动画体验
- 📱 **响应式布局** - 完美适配移动端
- 🚀 **性能优化** - GPU 加速,秒级启动

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 6
- **语言**: JavaScript (TypeScript 类型提示)
- **样式**: CSS3 (毛玻璃效果、渐变、动画)
- **插件平台**: uTools

## 📦 安装与使用

### 环境要求

- Node.js >= 16
- npm >= 7
- uTools (用于插件运行)

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问 `http://localhost:5173/` 查看效果

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 在 uTools 中使用

1. 打开 uTools 插件中心
2. 选择"开发者工具" -> "插件开发"
3. 添加插件,选择项目中的 `plugin.json` 文件
4. 启用插件后即可通过搜索关键词使用

## 📁 项目结构

```
随机测试数据/
├── src/
│   ├── Generator/          # 数据生成器页面
│   │   └── index.vue
│   ├── Read/               # 文件读取页面
│   │   └── index.vue
│   ├── Write/              # 文件写入页面
│   │   └── index.vue
│   ├── utils/
│   │   └── generator.js    # 数据生成工具函数
│   ├── App.vue             # 根组件
│   ├── main.css            # 全局样式(CSS变量、动画)
│   └── main.js             # 入口文件
├── public/
│   ├── preload/            # uTools 预加载脚本
│   │   ├── package.json
│   │   └── services.js
│   ├── logo.png            # 插件图标
│   └── plugin.json         # 插件配置
├── dist/                   # 构建产物
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
├── package.json            # 项目依赖
└── README.md               # 项目文档
```

## 🎨 设计系统

### 色彩体系

```css
/* 主色调渐变 */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-accent: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* 毛玻璃效果 */
--glass-bg: rgba(255, 255, 255, 0.6);
--glass-border: rgba(255, 255, 255, 0.4);
--glass-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.1);
```

### 动画系统

- `fadeIn` - 淡入动画
- `slideUp` - 上滑动画
- `slideDown` - 下滑动画
- `pulse` - 脉冲动画
- `spin` - 旋转动画
- `glow-pulse` - 发光脉冲
- `float` - 浮动动画
- `shimmer` - 微光动画

### 性能优化

- 使用 `backdrop-filter` 简化版(8-10px 模糊)
- 启用 GPU 硬件加速(`will-change`, `translateZ`)
- 优化 CSS transition 属性(仅动画必要属性)
- 减少背景装饰元素数量
- Vite 构建优化(代码分割、预加载)

## 🔧 配置说明

### uTools 插件配置

编辑 `public/plugin.json`:

```json
{
  "pluginName": "随机测试数据",
  "description": "快速生成各类测试数据",
  "author": "Your Name",
  "homepage": "https://github.com/your-repo",
  "main": "preload/index.html",
  "preload": "preload/services.js",
  "features": [
    {
      "code": "generator",
      "explain": "生成随机测试数据",
      "cmds": ["generator", "测试数据"]
    },
    {
      "code": "read",
      "explain": "读取文件内容",
      "cmds": ["read", "读取"]
    },
    {
      "code": "write",
      "explain": "保存文件",
      "cmds": ["write", "保存"]
    }
  ]
}
```

### Vite 配置

项目已优化构建配置:

- CSS 代码分割
- Terser 压缩
- 依赖预构建
- 开发服务器热重载
- 关键文件预加载

## 📝 开发指南

### 添加新的数据类型

1. 在 `src/utils/generator.js` 中添加生成函数:

```javascript
export const generateNewType = () => {
  // 生成逻辑
  return '生成的数据';
};
```

2. 在 `src/Generator/index.vue` 的 `dataList` 中添加配置:

```javascript
{
  label: "新类型",
  value: "",
  generator: generateNewType,
  key: "newtype",
  code: "gen-newtype",
  icon: "🎯",
  refreshing: false,
  copied: false,
}
```

3. 在 `plugin.json` 中添加对应的命令:

```json
{
  "code": "gen-newtype",
  "explain": "生成新类型数据",
  "cmds": ["newtype"]
}
```

### 修改主题颜色

编辑 `src/main.css` 中的 CSS 变量:

```css
:root {
  --gradient-primary: linear-gradient(135deg, #你的颜色1 0%, #你的颜色2 100%);
  --accent: #你的强调色;
}
```

### 调整动画速度

修改全局动画关键帧或组件中的 `animation-duration` 属性。

## 🚀 性能优化建议

### 开发环境

- 使用 `npm run dev` 启动开发服务器
- 启用 HMR 热重载,实时预览修改
- 关闭 sourcemap 提升构建速度

### 生产环境

- 运行 `npm run build` 优化构建
- 启用 terser 压缩减小体积
- 代码分割提升加载速度
- 使用 CDN 加速静态资源

### 运行时性能

- 已启用 GPU 硬件加速
- 优化了 backdrop-filter 使用
- 减少了不必要的 DOM 操作
- 使用 CSS transform 代替位置属性

## 🐛 常见问题

### Q: 启动速度慢怎么办?

A: 已优化初始化逻辑,数据会在组件加载时立即生成。如果仍然较慢,请检查:
- 网络环境(是否需要加载外部资源)
- 浏览器性能(是否支持硬件加速)
- uTools 版本(建议使用最新版本)

### Q: 毛玻璃效果不明显?

A: 为了性能优化,模糊值设置为 8-10px。如需更强效果:
```css
backdrop-filter: blur(20px) saturate(180%);
```

### Q: 深色主题如何切换?

A: 自动跟随系统主题,无需手动设置。可在系统设置中切换。

### Q: 如何自定义数据类型?

A: 参考 [开发指南 - 添加新的数据类型](#添加新的数据类型) 章节。

## 📄 许可证

MIT License

## 🙏 致谢

- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [uTools](https://u.tools/) - 高效生产力工具

## 📮 反馈与建议

如有问题或建议,欢迎反馈!

---

**Enjoy! 🎉**
