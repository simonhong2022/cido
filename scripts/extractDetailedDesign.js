/**
 * Figma 디자인 상세 정보 추출
 * 색상, 폰트, 크기, 간격 등을 정확히 추출
 */

const fs = require('fs');

const nodeData = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
const webFrame = nodeData.document;

console.log('🎨 상세 디자인 정보 추출\n');
console.log('='.repeat(80));

// RGB to HEX 변환
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// 모든 텍스트와 스타일 찾기
function findAllTexts(node, texts = []) {
  if (node.type === 'TEXT') {
    texts.push({
      text: node.characters,
      fontFamily: node.style?.fontFamily,
      fontSize: node.style?.fontSize,
      fontWeight: node.style?.fontWeight,
      letterSpacing: node.style?.letterSpacing,
      lineHeight: node.style?.lineHeightPx,
      color: node.fills?.[0]?.color ? rgbToHex(
        node.fills[0].color.r,
        node.fills[0].color.g,
        node.fills[0].color.b
      ) : null,
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      x: node.absoluteBoundingBox?.x,
      y: node.absoluteBoundingBox?.y,
    });
  }
  if (node.children) {
    node.children.forEach(child => findAllTexts(child, texts));
  }
  return texts;
}

// 모든 프레임과 배경색 찾기
function findFrameColors(node, frames = [], depth = 0, path = '') {
  const currentPath = path ? `${path} > ${node.name}` : node.name;
  
  if (node.type === 'FRAME' || node.type === 'INSTANCE' || node.type === 'COMPONENT') {
    const bgColor = node.fills?.[0]?.color;
    if (bgColor) {
      frames.push({
        name: node.name,
        path: currentPath,
        type: node.type,
        backgroundColor: rgbToHex(bgColor.r, bgColor.g, bgColor.b),
        width: node.absoluteBoundingBox?.width,
        height: node.absoluteBoundingBox?.height,
        depth: depth,
      });
    }
  }
  
  if (node.children && depth < 5) {
    node.children.forEach(child => findFrameColors(child, frames, depth + 1, currentPath));
  }
  
  return frames;
}

// 섹션별 분석
console.log('\n📐 각 섹션의 정확한 크기와 배경색:\n');

const sections = webFrame.children;
sections.forEach((section, idx) => {
  const box = section.absoluteBoundingBox;
  const bgColor = section.fills?.[0]?.color;
  
  console.log(`${idx + 1}. ${section.name}`);
  console.log(`   타입: ${section.type}`);
  console.log(`   크기: ${Math.round(box.width)} x ${Math.round(box.height)}`);
  if (bgColor) {
    console.log(`   배경색: ${rgbToHex(bgColor.r, bgColor.g, bgColor.b)}`);
  }
  console.log('');
});

// 4개 버튼 링크 섹션 상세 분석
console.log('\n' + '='.repeat(80));
console.log('🔍 4개 버튼 링크 섹션 상세 분석\n');

const buttonSection = sections.find(s => s.name === 'Button');
if (buttonSection && buttonSection.children) {
  buttonSection.children.forEach((btn, idx) => {
    console.log(`버튼 ${idx + 1}: ${btn.name}`);
    console.log(`  크기: ${Math.round(btn.absoluteBoundingBox.width)} x ${Math.round(btn.absoluteBoundingBox.height)}`);
    
    const bgColor = btn.fills?.[0]?.color;
    if (bgColor) {
      console.log(`  배경색: ${rgbToHex(bgColor.r, bgColor.g, bgColor.b)}`);
    }
    
    // 텍스트 찾기
    const texts = findAllTexts(btn);
    if (texts.length > 0) {
      console.log('  텍스트:');
      texts.forEach(t => {
        if (t.text) {
          console.log(`    - "${t.text}"`);
          console.log(`      폰트: ${t.fontFamily} ${t.fontSize}px weight:${t.fontWeight}`);
          console.log(`      색상: ${t.color}`);
        }
      });
    }
    console.log('');
  });
}

// Hero 배너 분석
console.log('='.repeat(80));
console.log('🎯 Hero 배너 상세 분석\n');

const heroSection = sections.find(s => s.name === 'HOME_Web');
if (heroSection) {
  const allTexts = findAllTexts(heroSection);
  console.log('배경색:', heroSection.fills?.[0]?.color ? 
    rgbToHex(heroSection.fills[0].color.r, heroSection.fills[0].color.g, heroSection.fills[0].color.b) : 'N/A');
  console.log('\n텍스트 요소:');
  allTexts.forEach(t => {
    if (t.text && t.text.length < 100) {
      console.log(`\n"${t.text}"`);
      console.log(`  폰트: ${t.fontFamily} ${t.fontSize}px weight:${t.fontWeight}`);
      console.log(`  색상: ${t.color}`);
      console.log(`  위치: x:${Math.round(t.x)} y:${Math.round(t.y)}`);
      console.log(`  크기: ${Math.round(t.width)} x ${Math.round(t.height)}`);
      if (t.letterSpacing) console.log(`  자간: ${t.letterSpacing}px`);
      if (t.lineHeight) console.log(`  행간: ${t.lineHeight}px`);
    }
  });
}

// Navigation 분석
console.log('\n' + '='.repeat(80));
console.log('🧭 Navigation 상세 분석\n');

const navSection = sections.find(s => s.name === 'HOME/Navigation_Logout_Web');
if (navSection) {
  console.log(`높이: ${Math.round(navSection.absoluteBoundingBox.height)}px`);
  const bgColor = navSection.fills?.[0]?.color;
  if (bgColor) {
    console.log(`배경색: ${rgbToHex(bgColor.r, bgColor.g, bgColor.b)}`);
  }
  
  const navTexts = findAllTexts(navSection);
  console.log('\n메뉴 항목:');
  navTexts.forEach(t => {
    if (t.text && t.text.length < 30) {
      console.log(`  - "${t.text}" (${t.fontSize}px, weight:${t.fontWeight}, ${t.color})`);
    }
  });
}

console.log('\n' + '='.repeat(80));
console.log('✅ 분석 완료!');
console.log('\n💡 이 정보를 바탕으로 완벽하게 구현하겠습니다.');

