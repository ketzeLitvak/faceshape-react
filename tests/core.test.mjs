import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EXPRESSIONS, SHAPES, seededTraits, resolveExpression, interpolateFace, mouthPath, faceTransform, defineShape, parseViewBox } from '../dist/core/index.js';

test('seed is deterministic and differentiates identities',()=>{
 assert.deepEqual(seededTraits('same'),seededTraits('same'));
 assert.notDeepEqual(seededTraits('same'),seededTraits('other'));
 assert.deepEqual(seededTraits(0),seededTraits('0'));
});
test('every expression stays finite through interpolation',()=>{
 for(const from of Object.values(EXPRESSIONS))for(const to of Object.values(EXPRESSIONS))for(const t of [0,.2,.5,.8,1]){
  const face=interpolateFace(from,to,t);
  assert.ok(Object.values(face).every(Number.isFinite));
  assert.equal(mouthPath(face).replace(/[-.\d\s]+/g,''),'MQQZ');
 }
 assert.deepEqual(interpolateFace(EXPRESSIONS.sad,EXPRESSIONS.happy,0),EXPRESSIONS.sad);
 assert.deepEqual(interpolateFace(EXPRESSIONS.sad,EXPRESSIONS.happy,1),EXPRESSIONS.happy);
});
test('custom geometry is validated and clamped',()=>{
 assert.equal(resolveExpression({eyeOpen:99}).eyeOpen,1.5);
 assert.throws(()=>resolveExpression({mouthOpen:NaN}),/Invalid/);
 assert.throws(()=>resolveExpression('missing'),/Unknown expression/);
});
test('faceBox respects arbitrary viewBox origins and dimensions',()=>{
 assert.equal(faceTransform({x:.25,y:.2,width:.5,height:.4},'10 20 200 100'),'translate(60 40) scale(1 0.4)');
 for(const shape of Object.values(SHAPES))assert.doesNotThrow(()=>defineShape(shape));
 assert.throws(()=>defineShape({path:'M0 0',faceBox:{x:.8,y:0,width:.4,height:.5}}),/faceBox/);
 assert.throws(()=>parseViewBox('0 0 0 10'),/viewBox/);
 assert.throws(()=>parseViewBox('0 0 10'),/viewBox/);
});
