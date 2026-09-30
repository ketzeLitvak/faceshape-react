import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Character, Eyes, Mouth, Eyebrows, EXPRESSIONS, SHAPES } from '../dist/index.js';

test('SSR renders all built-in shape/expression pairs without browser APIs',()=>{
 for(const shape of Object.keys(SHAPES))for(const expression of Object.keys(EXPRESSIONS)){
  const svg=renderToString(React.createElement(Character,{shape,expression,motion:{idle:true,blink:true,talking:true,lookAt:'cursor'}}));
  assert.match(svg,/data-faceshape-shape/);assert.match(svg,/data-faceshape-mouth/);
  assert.doesNotMatch(svg,/NaN|undefined/);
 }
});
test('SVG is decorative by default and can be labeled',()=>{
 assert.match(renderToString(React.createElement(Character)),/aria-hidden="true"/);
 const named=renderToString(React.createElement(Character,{label:'Happy friend'}));
 assert.match(named,/role="img"/);assert.match(named,/aria-label="Happy friend"/);
 assert.doesNotMatch(named,/aria-hidden="true"/);
});
test('multiple characters have unique pupil clip IDs',()=>{
 const svg=renderToString(React.createElement('div',null,...Array.from({length:8},()=>React.createElement(Character,{faceStyle:'cartoon'}))));
 const ids=[...svg.matchAll(/id="(fs-eye-[^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,16);assert.equal(new Set(ids).size,16);
});
test('custom paths, SVG nodes and face composition are supported',()=>{
 const shape={viewBox:'10 20 200 100',faceBox:{x:.2,y:.2,width:.5,height:.4},render:({color})=>React.createElement('rect',{x:10,y:20,width:200,height:100,fill:color})};
 const svg=renderToString(React.createElement(Character,{shape,color:'tomato'},React.createElement(Eyes,{variant:'cute'}),React.createElement(Mouth,{variant:'grin'}),React.createElement(Eyebrows,{variant:'raised'})));
 assert.match(svg,/fill="tomato"/);assert.match(svg,/translate\(50 40\) scale\(1 0.4\)/);
 assert.match(svg,/data-faceshape-eyebrows/);
});
test('reducedMotion disables CSS motion classes',()=>{
 const svg=renderToString(React.createElement(Character,{reducedMotion:true,motion:{idle:true,bounce:true,shake:true}}));
 assert.doesNotMatch(svg,/class="fs-(idle|bounce|shake)"/);
});
test('CommonJS build exposes the public API', async()=>{
 const {createRequire}=await import('node:module');const require=createRequire(import.meta.url);
 const library=require('../dist/index.cjs');assert.equal(typeof library.defineShape,'function');
 assert.equal(typeof library.Character.render,'function');
});

test('face styles differ and mouth variants remain independent',()=>{
 const soft=renderToString(React.createElement(Character,{expression:'happy',faceStyle:'soft'}));
 const cartoon=renderToString(React.createElement(Character,{expression:'happy',faceStyle:'cartoon'}));
 assert.match(soft,/data-face-style="soft"/);assert.match(cartoon,/data-face-style="cartoon"/);
 assert.notEqual(soft,cartoon);
 const neutralMouth=renderToString(React.createElement(Character,{expression:'happy',faceStyle:'soft',face:{mouth:'neutral'}}));
 assert.match(neutralMouth,/data-faceshape-mouth/);assert.notEqual(soft,neutralMouth);
});

test('all reference eyes and mouths can be mixed independently in every style',()=>{
 const styles=['minimal','soft','cheerful','cartoon','sly','kawaii'];
 const eyes=['dots','bright','joyful','cartoon','sly','kawaii'];
 const mouths=['gentle','tongue','joyful','toothy','smirk','cat'];
 for(const faceStyle of styles)for(const eye of eyes)for(const mouth of mouths){
  const svg=renderToString(React.createElement(Character,{faceStyle,expression:'happy',face:{eyes:eye,mouth}}));
  assert.match(svg,new RegExp(`data-eye-variant="${eye}"`));
  assert.match(svg,new RegExp(`data-mouth-variant="${mouth}"`));
  assert.doesNotMatch(svg,/NaN|undefined/);
  if(mouth==='toothy')assert.match(svg,/fill="white"/);
 }
});
test('B remains the default and each reference preset has distinct geometry',()=>{
 const svg=renderToString(React.createElement(Character,{expression:'happy'}));
 assert.match(svg,/data-eye-variant="bright"/);
 assert.match(svg,/data-mouth-variant="tongue"/);
 const rendered=['minimal','soft','cheerful','cartoon','sly','kawaii'].map(faceStyle=>renderToString(React.createElement(Character,{expression:'happy',faceStyle})).replace(/fs-(eye|mouth)-[^" ]+/g,'clip'));
 assert.equal(new Set(rendered).size,6);
});

test('pointed shark teeth work independently of the eye preset',()=>{
 for(const faceStyle of ['minimal','soft','cheerful','cartoon','sly','kawaii']){
  const svg=renderToString(React.createElement(Character,{faceStyle,expression:'happy',face:{eyes:'bright',mouth:'shark'}}));
  assert.match(svg,/data-mouth-variant="shark"/);
  assert.match(svg,/data-eye-variant="bright"/);
  assert.match(svg,/data-faceshape-shark-teeth=""/);
  assert.doesNotMatch(svg,/NaN|undefined/);
 }
 const plain=renderToString(React.createElement(Character,{expression:'happy',face:{mouth:'toothy'}}));
 assert.doesNotMatch(plain,/data-faceshape-shark-teeth/);
});

test('name controls automatic body shape and color while fixed color wins',()=>{
 const render=props=>renderToString(React.createElement(Character,{name:'Ana',shape:'blob',...props}));
 const getBody=svg=>svg.match(/data-faceshape-shape="" d="([^"]+)" fill="([^"]+)"/).slice(1);
 assert.deepEqual(getBody(render({})),getBody(render({})));
 assert.notDeepEqual(getBody(render({})),getBody(render({name:'Bruno'})));
 assert.equal(getBody(render({color:'#123456'}))[1],'#123456');
 assert.equal(getBody(render({name:'Bruno',color:'#123456'}))[1],'#123456');
 assert.notEqual(getBody(render({color:'#123456'}))[0],getBody(render({name:'Bruno',color:'#123456'}))[0]);
 assert.deepEqual(getBody(render({seed:'different'})),getBody(render({})));
 assert.doesNotMatch(render({}),/<svg[^>]*\sname=/);
});
test('capabilities follow eye pose and all mouth styles can talk',async()=>{
 const {getMotionCapabilities}=await import('../dist/index.js');
 for(const eyes of ['closed','happy','joyful'])assert.equal(getMotionCapabilities(eyes,'tongue').blink,false);
 assert.equal(getMotionCapabilities('bright','cat').talking,true);
 assert.equal(getMotionCapabilities('capsule','shark').talking,true);
 assert.equal(getMotionCapabilities('capsule','tongue').blink,true);
});

test('mouth and brows follow whole-eye gaze but stay fixed for pupil-only eyes',()=>{
 const transform=(svg,part)=>svg.match(new RegExp(`<g transform="([^"]+)" data-faceshape-${part}`))[1];
 for(const eyes of ['bright','dots','capsule','sly','kawaii']){
  const svg=renderToString(React.createElement(Character,{face:{eyes,eyebrows:'raised'},motion:{lookAt:{x:1,y:0}}}));
  const scale=eyes==='sly'?1.8:3;
  assert.equal(transform(svg,'eyebrows'),`translate(${scale} ${-scale})`);
  assert.equal(transform(svg,'mouth'),`translate(${scale*.4} ${-scale*.4})`);
 }
 for(const eyes of ['cartoon','closed','joyful']){
  const svg=renderToString(React.createElement(Character,{face:{eyes,eyebrows:'raised'},motion:{lookAt:{x:1,y:0}}}));
  assert.equal(transform(svg,'eyebrows'),'translate(0 0)');
  assert.equal(transform(svg,'mouth'),'translate(0 0)');
 }
 const reduced=renderToString(React.createElement(Character,{face:{eyes:'bright',eyebrows:'raised'},motion:{lookAt:{x:1,y:0}},reducedMotion:true}));
 assert.equal(transform(reduced,'mouth'),'translate(0 0)');
});

test('every eye and mouth style adapts to every expression',()=>{
 const eyeVariants=['round','oval','cute','happy','closed','dots','bright','joyful','cartoon','sly','kawaii','capsule'];
 const mouthVariants=['smile','frown','neutral','open','grin','small','gentle','tongue','joyful','toothy','shark','smirk','cat'];
 for(const eyes of eyeVariants){
  const faces=Object.keys(EXPRESSIONS).map(expression=>renderToString(React.createElement(Character,{expression,face:{eyes}})).match(/<g data-faceshape-eyes[\s\S]*?<\/g>/)[0]);
  assert.equal(new Set(faces).size,6,`Every expression must change eyes: ${eyes}`);
 }
 for(const mouth of mouthVariants){
  const paths=Object.keys(EXPRESSIONS).map(expression=>renderToString(React.createElement(Character,{expression,face:{mouth}})).match(/data-faceshape-mouth[\s\S]*?<path d="([^"]+)"/)[1]);
  assert.equal(new Set(paths).size,6,`Every expression must change mouth: ${mouth}`);
 }
});
