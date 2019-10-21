# webGL-polyfile

一个 webGl 和 webpack 的学习实践.

源码 fork 自  https://github.com/vaalentin/2015 

在此基础上进行学习和修改.

**Done**

- [x] 从 bower + browserify + Gulp 迁移到 npm + webpack
- [x] 配置 webpack 多入口, 资源打包, 压缩等
- [x] 重构文件目录结构
- [x] 更新所有依赖的版本为最新版本, 替换已被废弃的包
- [x] 测试跑通代码, 修复部分依赖更新导致的 bug

**Todo**

- [ ] 打包 index.html, 优化js加载的逻辑
- [ ] 缩小 vendor.js 的体积, 目前最大的包达到 2M ,绝对有哪里搞错了
- [ ] 尝试用 GLTFExporter 重新导出模型数据, 废弃老版本的 JSONloader
- [ ] 由于chrome的策略, 现在不能页面打开就播放音频, 需要添加一个触发音频的按钮
- [ ] 修复控制按钮的bug
- [ ] 修复遗留的资源路径错误
- [ ] 首页动画有bug, 文字不会立即显示, 估计是onload处逻辑出错.
- [ ] 第4页模型出错
- [ ] 倒数第二页城市模型边缘光消失, 原因是新版本three.js attribute需要放在geometry内设置
- [ ] mobile 页面未测试跑通, 目测还有 bug
- [ ] 添加测试代码
- [ ] 添加自定义内容, 代码重构

**quick start**

```shell
# install dependencies
npm i
# dev: server will run at localhost:9000
npm run start
# build dist
npm run build
```

**others**

- 打包后可直接运行的文件

```
app_____
     |_dist/
     |_index.html
```

- `public/`及`src/`为打包前的资源目录