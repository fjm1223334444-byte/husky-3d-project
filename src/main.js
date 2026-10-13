import * as THREE from 'three';
import { sceneConfig, validConfig } from './config.js';
import { createHusky } from './husky.js';
import './style.css';

if (!validConfig(sceneConfig)) throw new Error('Invalid scene config');
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
app.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color(sceneConfig.sky);
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(sceneConfig.camera.x, sceneConfig.camera.y, sceneConfig.camera.z);
camera.lookAt(0, 0.9, 0);
scene.add(new THREE.HemisphereLight(0xffffff, 0x7d936b, 2));
const sun = new THREE.DirectionalLight(0xffffff, 2.4);
sun.position.set(-3, 8, 5); sun.castShadow = true; scene.add(sun);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: sceneConfig.grass }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
for (const [x,y,z,s] of [[-4,4,-9,1.2],[2,5,-13,1.5],[7,3,-18,1]]) {
  const cloud = new THREE.Group();
  for (const dx of [-0.8,0,0.8]) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(1,16,12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    puff.position.x=dx; puff.scale.set(1,0.4,0.55); cloud.add(puff);
  }
  cloud.position.set(x,y,z); cloud.scale.setScalar(s); scene.add(cloud);
}
const husky = createHusky(sceneConfig.husky); scene.add(husky.group);
const note = document.createElement('div'); note.className = 'note'; note.textContent = '3D 哈士奇草原 · 可编程占位模型（非照片级写实）'; app.append(note);
const clock = new THREE.Clock();
function animate() { requestAnimationFrame(animate); husky.update(clock.getElapsedTime()); renderer.render(scene,camera); }
animate();
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
