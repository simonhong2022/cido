const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));

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

// Frame 1261154918 > Frame 1261154919 > Button 찾기
const frame1918 = data.document.children.find(c => c.name === 'Frame 1261154918');
if (frame1918) {
  const frame1919 = frame1918.children.find(c => c.name === 'Frame 1261154919');
  if (frame1919) {
    const buttonSection = frame1919.children.find(c => c.name === 'Button');
    if (buttonSection && buttonSection.children) {
      console.log('4개 버튼 링크 섹션:\n');
      console.log(`전체 크기: ${Math.round(buttonSection.absoluteBoundingBox.width)} x ${Math.round(buttonSection.absoluteBoundingBox.height)}\n`);
      console.log('='.repeat(70));
      
      buttonSection.children.forEach((btn, idx) => {
        console.log(`\n${idx + 1}. ${btn.name}`);
        console.log(`   크기: ${Math.round(btn.absoluteBoundingBox.width)} x ${Math.round(btn.absoluteBoundingBox.height)}`);
        
        if (btn.fills && btn.fills[0]) {
          if (btn.fills[0].type === 'IMAGE') {
            console.log('   배경: IMAGE (이미지)');
            console.log(`   Image Ref: ${btn.fills[0].imageRef || 'N/A'}`);
          } else if (btn.fills[0].color) {
            const c = btn.fills[0].color;
            const hex = '#' + [c.r, c.g, c.b].map(n => Math.round(n*255).toString(16).padStart(2,'0')).join('');
            console.log(`   배경: ${hex}`);
          }
        }
        
        const texts = findAllTexts(btn);
        if (texts.length > 0) {
          console.log('   텍스트:');
          texts.forEach(t => {
            if (t.text && t.text.length < 100) {
              console.log(`     - "${t.text}"`);
              console.log(`       폰트: ${t.fontSize}px, weight:${t.fontWeight}, 색상:${t.color}`);
            }
          });
        }
      });
      
      // 이미지 URL 가져오기 필요
      console.log('\n\n💡 각 버튼은 이미지 배경을 사용합니다.');
      console.log('   이미지 URL을 가져와서 적용해야 합니다.');
    }
  }
}

