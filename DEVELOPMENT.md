# 开发约定

- 用 `src/config.js` 调整草地、天空、相机、哈士奇位置和摆尾速度。
- `src/husky.js` 是占位模型。照片级写实模型尚未制作；未来将独立替换为授权使用的 glTF 资源。
- `src/main.js` 控制场景，避免把模型与场景混在一起。
- 本地运行：安装 Node.js 22，执行 `npm install`、`npm run dev`。
- 验证：`npm test` 和 `npm run build`。
- GitHub Actions 当前仅执行自动测试，不会自动调用 AI、更改模型、合并 PR 或收费。
- 不要将个人隐私、密钥、token 或未公开的个人档案提交到公开仓库。
