// 集中修改参数，不需要重新生成整个模型。
export const sceneConfig = Object.freeze({
  sky: 0x8dcaf3,
  grass: 0x78ac59,
  camera: { x: 0, y: 2.5, z: 9 },
  husky: { x: 0, y: 0, z: 0, scale: 1, tailWagSpeed: 3 }
});
export function validConfig(config) {
  return config.husky.scale > 0 && config.husky.tailWagSpeed >= 0 &&
    ['x','y','z'].every(axis => Number.isFinite(config.camera[axis]));
}
