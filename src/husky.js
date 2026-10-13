import * as THREE from 'three';

// 可替换的程序化占位模型：未来以写实 glTF 模型替换，不影响场景模块。
export function createHusky(config) {
  const dog = new THREE.Group();
  const fur = new THREE.MeshStandardMaterial({ color: 0x69737b, roughness: 0.95 });
  const white = new THREE.MeshStandardMaterial({ color: 0xecebea, roughness: 0.95 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x202b37 });
  function ellipsoid(radius, position, scale, material, parent = dog) {
    const item = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 12), material);
    item.position.set(...position); item.scale.set(...scale); item.castShadow = true; parent.add(item); return item;
  }
  ellipsoid(1, [0, 1.05, 0], [1.2, 0.57, 0.47], fur);
  ellipsoid(1, [0, 0.82, 0.12], [0.85, 0.21, 0.38], white);
  ellipsoid(1, [-0.95, 1.37, 0], [0.49, 0.47, 0.42], fur);
  ellipsoid(1, [-1.32, 1.18, 0], [0.35, 0.2, 0.31], white);
  ellipsoid(1, [-1.58, 1.22, 0], [0.08, 0.075, 0.13], dark);
  for (const z of [-0.29, 0.29]) {
    for (const x of [-0.78, 0.78]) ellipsoid(1, [x, 0.48, z], [0.16, 0.48, 0.17], x < 0 ? white : fur);
    ellipsoid(1, [-1.03, 1.73, z * 0.9], [0.18, 0.35, 0.15], fur);
    ellipsoid(1, [-1.31, 1.42, z * 0.75], [0.08, 0.09, 0.05], dark);
  }
  const tail = new THREE.Group(); tail.position.set(1.04, 1.25, 0); dog.add(tail);
  ellipsoid(1, [0.35, 0.25, 0], [0.22, 0.48, 0.23], fur, tail).rotation.z = -0.8;
  dog.position.set(config.x, config.y, config.z); dog.scale.setScalar(config.scale);
  return { group: dog, update(seconds) { tail.rotation.y = Math.sin(seconds * config.tailWagSpeed) * 0.35; } };
}
