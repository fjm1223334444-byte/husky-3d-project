import test from 'node:test';
import assert from 'node:assert/strict';
import { sceneConfig, validConfig } from '../src/config.js';
test('scene parameters are valid', () => assert.equal(validConfig(sceneConfig), true));
test('rejects invalid scale', () => assert.equal(validConfig({...sceneConfig,husky:{...sceneConfig.husky,scale:0}}), false));
test('rejects invalid camera', () => assert.equal(validConfig({...sceneConfig,camera:{...sceneConfig.camera,x:NaN}}), false));
