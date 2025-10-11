const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));

function findFooter(node) {
  if (node.name && node.name.toLowerCase().includes('footer')) {
    return node;
  }
  if (node.children) {
    for (let child of node.children) {
      const found = findFooter(child);
      if (found) return found;
    }
  }
  return null;
}

function findAllTexts(node, texts = []) {
  if (node.type === 'TEXT') {
    texts.push({
      text: node.characters,
      fontSize: node.style?.fontSize,
      fontWeight: node.style?.fontWeight,
      color: node.fills?.[0]?.color ? 
        '#' + [node.fills[0].color.r, node.fills[0].color.g, node.fills[0].color.b]
          .map(n => Math.round(n*255).toString(16).padStart(2,'0')).join('') : null,
    });
  }
  if (node.children) {
    node.children.forEach(child => findAllTexts(child, texts));
  }
  return texts;
}

const footer = findFooter(data.document);
if (footer) {
  console.log('Footer 정보:');
  console.log(`이름: ${footer.name}`);
  console.log(`크기: ${Math.round(footer.absoluteBoundingBox.width)} x ${Math.round(footer.absoluteBoundingBox.height)}`);
  
  if (footer.fills && footer.fills[0]) {
    if (footer.fills[0].color) {
      const c = footer.fills[0].color;
      const hex = '#' + [c.r, c.g, c.b].map(n => Math.round(n*255).toString(16).padStart(2,'0')).join('');
      console.log(`배경색: ${hex}`);
    }
  }
  
  console.log('\n텍스트 내용:');
  const texts = findAllTexts(footer);
  texts.forEach((t, idx) => {
    if (t.text && t.text.length < 200) {
      console.log(`${idx + 1}. "${t.text}"`);
      console.log(`   폰트: ${t.fontSize}px, weight:${t.fontWeight}, 색상:${t.color}`);
    }
  });
  
  console.log('\n자식 요소들:');
  if (footer.children) {
    footer.children.forEach((child, idx) => {
      console.log(`${idx + 1}. ${child.name} (${child.type})`);
      if (child.absoluteBoundingBox) {
        const box = child.absoluteBoundingBox;
        console.log(`   크기: ${Math.round(box.width)} x ${Math.round(box.height)}`);
      }
    });
  }
} else {
  console.log('Footer를 찾을 수 없습니다.');
  
  // 전체 구조에서 Footer 관련 요소 찾기
  console.log('\n전체 구조에서 Footer 관련 요소 검색:');
  function searchForFooter(node, depth = 0) {
    const indent = '  '.repeat(depth);
    if (node.name && (
      node.name.toLowerCase().includes('footer') || 
      node.name.toLowerCase().includes('copyright') ||
      node.name.toLowerCase().includes('instagram')
    )) {
      console.log(`${indent}${node.name} (${node.type})`);
      if (node.absoluteBoundingBox) {
        const box = node.absoluteBoundingBox;
        console.log(`${indent}  크기: ${Math.round(box.width)} x ${Math.round(box.height)}`);
      }
    }
    if (node.children && depth < 5) {
      node.children.forEach(child => searchForFooter(child, depth + 1));
    }
  }
  
  searchForFooter(data.document);
}
