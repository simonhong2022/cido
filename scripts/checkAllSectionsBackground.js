const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));

function findFrame(node, name) {
  if (node.name === name) {
    return node;
  }
  if (node.children) {
    for (let child of node.children) {
      const found = findFrame(child, name);
      if (found) return found;
    }
  }
  return null;
}

function checkBackground(frame, name) {
  console.log(`\n${name}:`);
  console.log(`  크기: ${Math.round(frame.absoluteBoundingBox.width)} x ${Math.round(frame.absoluteBoundingBox.height)}`);
  
  if (frame.fills && frame.fills.length > 0) {
    frame.fills.forEach((fill, idx) => {
      if (fill.type === 'SOLID' && fill.color) {
        const c = fill.color;
        const hex = '#' + [c.r, c.g, c.b].map(n => Math.round(n*255).toString(16).padStart(2,'0')).join('');
        console.log(`  배경색: ${hex}`);
        console.log(`  투명도: ${Math.round(fill.opacity * 100)}%`);
      } else if (fill.type === 'IMAGE') {
        console.log(`  배경: IMAGE`);
      } else {
        console.log(`  배경: ${fill.type}`);
      }
    });
  } else {
    console.log(`  배경색: 없음 (기본 투명)`);
  }
}

// 각 섹션 확인
const sections = [
  'Hot_Project',
  'Frame 1261154926', 
  'Interview',
  'Button'
];

sections.forEach(sectionName => {
  const frame = findFrame(data.document, sectionName);
  if (frame) {
    checkBackground(frame, sectionName);
  } else {
    console.log(`\n${sectionName}: 찾을 수 없음`);
  }
});
