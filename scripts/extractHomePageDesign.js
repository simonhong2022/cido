/**
 * Home 페이지 디자인 정보 추출 스크립트
 * Figma JSON에서 실제 구현에 필요한 정보만 추출
 */

const fs = require('fs');

const figmaData = JSON.parse(fs.readFileSync('./figma-home-page.json', 'utf8'));

// Desktop 섹션 찾기
const desktopSection = figmaData.children.find(child => 
  child.name === 'Desktop' && child.type === 'SECTION'
);

if (!desktopSection) {
  console.log('❌ Desktop 섹션을 찾을 수 없습니다.');
  process.exit(1);
}

const webFrame = desktopSection.children.find(child => child.name === 'Web');

console.log('🎨 Home 페이지 구조 분석\n');
console.log('='.repeat(60));

// 웹 프레임의 자식들 분석
webFrame.children.forEach((child, index) => {
  console.log(`\n${index + 1}. ${child.name} [${child.type}]`);
  console.log(`   크기: ${Math.round(child.absoluteBoundingBox.width)} x ${Math.round(child.absoluteBoundingBox.height)}`);
  
  if (child.type === 'INSTANCE') {
    console.log(`   컴포넌트: ${child.name}`);
  }
  
  // 텍스트 노드 찾기
  const texts = findTexts(child);
  if (texts.length > 0 && texts.length < 10) {
    console.log('   텍스트:');
    texts.forEach(text => {
      if (text.characters && text.characters.length < 100) {
        console.log(`     - "${text.characters}"`);
      }
    });
  }
  
  // 배경색 확인
  if (child.fills && child.fills[0] && child.fills[0].color) {
    const color = child.fills[0].color;
    const hex = rgbToHex(color.r, color.g, color.b);
    console.log(`   배경색: ${hex}`);
  }
});

function findTexts(node, texts = []) {
  if (node.type === 'TEXT') {
    texts.push(node);
  }
  if (node.children) {
    node.children.forEach(child => findTexts(child, texts));
  }
  return texts;
}

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// 배너 정보 추출
console.log('\n\n' + '='.repeat(60));
console.log('🎯 배너 상세 정보\n');

const bannerInstance = webFrame.children.find(child => 
  child.name === 'HOME_Web'
);

if (bannerInstance && bannerInstance.children) {
  const banner = bannerInstance.children[0]; // 첫 번째 배너
  
  console.log(`배너: ${banner.name}`);
  
  const allTexts = findTexts(banner);
  console.log('\n모든 텍스트:');
  allTexts.forEach(text => {
    if (text.characters) {
      console.log(`\n- "${text.characters}"`);
      if (text.style) {
        console.log(`  폰트: ${text.style.fontFamily} ${text.style.fontSize}px ${text.style.fontWeight}`);
        if (text.fills && text.fills[0] && text.fills[0].color) {
          const color = text.fills[0].color;
          console.log(`  색상: ${rgbToHex(color.r, color.g, color.b)}`);
        }
      }
    }
  });
}

console.log('\n\n✅ 분석 완료!');

