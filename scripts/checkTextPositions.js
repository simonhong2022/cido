const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));

function checkTextPosition(button, index) {
  console.log(`\n${index + 1}. ${button.name}`);
  
  // 텍스트 요소 찾기
  const textElement = button.children.find(child => child.type === 'TEXT');
  if (textElement) {
    console.log(`   텍스트: "${textElement.characters}"`);
    
    // 절대 위치 계산
    const buttonBox = button.absoluteBoundingBox;
    const textBox = textElement.absoluteBoundingBox;
    
    const relativeX = textBox.x - buttonBox.x;
    const relativeY = textBox.y - buttonBox.y;
    
    console.log(`   버튼 크기: ${Math.round(buttonBox.width)} x ${Math.round(buttonBox.height)}`);
    console.log(`   텍스트 크기: ${Math.round(textBox.width)} x ${Math.round(textBox.height)}`);
    console.log(`   텍스트 위치: x=${Math.round(relativeX)}px, y=${Math.round(relativeY)}px`);
    console.log(`   텍스트 위치 (%): x=${Math.round(relativeX/buttonBox.width*100)}%, y=${Math.round(relativeY/buttonBox.height*100)}%`);
    
    // 폰트 정보
    if (textElement.style) {
      console.log(`   폰트 크기: ${textElement.style.fontSize}px`);
      console.log(`   폰트 두께: ${textElement.style.fontWeight}`);
    }
  }
}

// Frame 1261154918 > Frame 1261154919 > Button 찾기
const frame1918 = data.document.children.find(c => c.name === 'Frame 1261154918');
if (frame1918) {
  const frame1919 = frame1918.children.find(c => c.name === 'Frame 1261154919');
  if (frame1919) {
    const buttonSection = frame1919.children.find(c => c.name === 'Button');
    if (buttonSection && buttonSection.children) {
      console.log('4개 버튼 텍스트 위치 분석:\n');
      console.log('='.repeat(70));
      
      buttonSection.children.forEach((btn, idx) => {
        checkTextPosition(btn, idx);
      });
    }
  }
}
