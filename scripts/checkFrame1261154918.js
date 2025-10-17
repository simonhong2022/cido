const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));

function findFrame(node) {
  if (node.name === 'Frame 1261154918') {
    return node;
  }
  if (node.children) {
    for (let child of node.children) {
      const found = findFrame(child);
      if (found) return found;
    }
  }
  return null;
}

const frame = findFrame(data.document);
if (frame) {
  console.log('Frame 1261154918 정보:');
  console.log(`이름: ${frame.name}`);
  console.log(`크기: ${Math.round(frame.absoluteBoundingBox.width)} x ${Math.round(frame.absoluteBoundingBox.height)}`);
  
  // 배경색 확인
  if (frame.fills && frame.fills.length > 0) {
    frame.fills.forEach((fill, idx) => {
      console.log(`\nFill ${idx + 1}:`);
      if (fill.type === 'SOLID' && fill.color) {
        const c = fill.color;
        const hex = '#' + [c.r, c.g, c.b].map(n => Math.round(n*255).toString(16).padStart(2,'0')).join('');
        console.log(`  타입: SOLID`);
        console.log(`  색상: ${hex}`);
        console.log(`  투명도: ${Math.round(fill.opacity * 100)}%`);
      } else if (fill.type === 'IMAGE') {
        console.log(`  타입: IMAGE`);
        console.log(`  Image Ref: ${fill.imageRef || 'N/A'}`);
      } else {
        console.log(`  타입: ${fill.type}`);
      }
    });
  } else {
    console.log('\n배경색: 없음 (기본 투명)');
  }
  
  // 자식 요소들 확인
  console.log('\n자식 요소들:');
  if (frame.children) {
    frame.children.forEach((child, idx) => {
      console.log(`${idx + 1}. ${child.name} (${child.type})`);
      if (child.absoluteBoundingBox) {
        const box = child.absoluteBoundingBox;
        console.log(`   크기: ${Math.round(box.width)} x ${Math.round(box.height)}`);
      }
    });
  }
} else {
  console.log('Frame 1261154918을 찾을 수 없습니다.');
}
