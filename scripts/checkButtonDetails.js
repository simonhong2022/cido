const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));

function analyzeButton(button, index) {
  console.log(`\n${index + 1}. ${button.name}`);
  console.log(`   크기: ${Math.round(button.absoluteBoundingBox.width)} x ${Math.round(button.absoluteBoundingBox.height)}`);
  
  // 배경색과 이미지 분석
  if (button.fills && button.fills.length > 0) {
    button.fills.forEach((fill, fillIndex) => {
      console.log(`   Fill ${fillIndex + 1}:`);
      if (fill.type === 'IMAGE') {
        console.log(`     타입: IMAGE`);
        console.log(`     Image Ref: ${fill.imageRef || 'N/A'}`);
      } else if (fill.type === 'SOLID') {
        const c = fill.color;
        const hex = '#' + [c.r, c.g, c.b].map(n => Math.round(n*255).toString(16).padStart(2,'0')).join('');
        console.log(`     타입: SOLID`);
        console.log(`     색상: ${hex}`);
        console.log(`     투명도: ${Math.round(fill.opacity * 100)}%`);
      } else {
        console.log(`     타입: ${fill.type}`);
      }
    });
  }
  
  // 자식 요소들 분석 (image 80.png 같은 요소들)
  if (button.children) {
    console.log(`   자식 요소들:`);
    button.children.forEach((child, childIndex) => {
      console.log(`     ${childIndex + 1}. ${child.name} (${child.type})`);
      
      if (child.fills && child.fills.length > 0) {
        child.fills.forEach((fill, fillIndex) => {
          if (fill.type === 'IMAGE') {
            console.log(`       Fill ${fillIndex + 1}: IMAGE`);
            console.log(`       Image Ref: ${fill.imageRef || 'N/A'}`);
          } else if (fill.type === 'SOLID') {
            const c = fill.color;
            const hex = '#' + [c.r, c.g, c.b].map(n => Math.round(n*255).toString(16).padStart(2,'0')).join('');
            console.log(`       Fill ${fillIndex + 1}: SOLID ${hex}`);
          }
        });
      }
      
      // 크기 정보
      if (child.absoluteBoundingBox) {
        const box = child.absoluteBoundingBox;
        console.log(`       크기: ${Math.round(box.width)} x ${Math.round(box.height)}`);
      }
    });
  }
}

// Frame 1261154918 > Frame 1261154919 > Button 찾기
const frame1918 = data.document.children.find(c => c.name === 'Frame 1261154918');
if (frame1918) {
  const frame1919 = frame1918.children.find(c => c.name === 'Frame 1261154919');
  if (frame1919) {
    const buttonSection = frame1919.children.find(c => c.name === 'Button');
    if (buttonSection && buttonSection.children) {
      console.log('4개 버튼 링크 섹션 상세 분석:\n');
      console.log('='.repeat(70));
      
      buttonSection.children.forEach((btn, idx) => {
        analyzeButton(btn, idx);
      });
    }
  }
}
