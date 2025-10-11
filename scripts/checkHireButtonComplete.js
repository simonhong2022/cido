const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function checkHireButtonComplete() {
  try {
    console.log('디자인 의뢰하기 버튼 완전 분석 중...\n');
    
    const response = await axios.get(`https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}`, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
      },
    });
    
    const figmaData = response.data;
    const document = figmaData.document;
    
    function findNodeById(node, targetId) {
      if (node.id === targetId) {
        return node;
      }
      
      if (node.children) {
        for (let child of node.children) {
          const found = findNodeById(child, targetId);
          if (found) return found;
        }
      }
      
      return null;
    }
    
    const hireButton = findNodeById(document, 'I136:7554;1:630');
    
    if (hireButton) {
      console.log('======================================================================');
      console.log('디자인 의뢰하기 버튼 완전 정보:');
      console.log('======================================================================\n');
      
      // JSON으로 저장
      fs.writeFileSync('hire-button-complete.json', JSON.stringify(hireButton, null, 2));
      
      console.log('프레임 정보:');
      console.log(`  이름: ${hireButton.name}`);
      console.log(`  타입: ${hireButton.type}`);
      
      if (hireButton.absoluteBoundingBox) {
        console.log(`  크기: ${hireButton.absoluteBoundingBox.width}px × ${hireButton.absoluteBoundingBox.height}px`);
      }
      
      if (hireButton.cornerRadius) {
        console.log(`  모서리 반경: ${hireButton.cornerRadius}px`);
      }
      
      console.log('\n배경 (fills):');
      if (hireButton.fills) {
        hireButton.fills.forEach((fill, index) => {
          console.log(`  Fill ${index + 1}:`);
          console.log(`    타입: ${fill.type}`);
          console.log(`    visible: ${fill.visible !== false ? 'true' : 'false'}`);
          
          if (fill.color) {
            const color = fill.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
        });
      }
      
      console.log('\n테두리 (strokes):');
      if (hireButton.strokes && hireButton.strokes.length > 0) {
        hireButton.strokes.forEach((stroke, index) => {
          console.log(`  Stroke ${index + 1}:`);
          console.log(`    visible: ${stroke.visible !== false ? 'true' : 'false'}`);
          
          if (stroke.color) {
            const color = stroke.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
        });
        console.log(`  strokeWeight: ${hireButton.strokeWeight}px`);
        console.log(`  strokeAlign: ${hireButton.strokeAlign}`);
      } else {
        console.log('  테두리 없음');
      }
      
      console.log('\n텍스트:');
      const hireText = findNodeById(hireButton, 'I136:7554;1:631');
      
      if (hireText) {
        console.log(`  내용: "${hireText.characters}"`);
        
        if (hireText.style) {
          console.log(`  폰트: ${hireText.style.fontFamily}`);
          console.log(`  크기: ${hireText.style.fontSize}px`);
          console.log(`  두께: ${hireText.style.fontWeight}`);
        }
        
        if (hireText.fills) {
          console.log('  색상:');
          hireText.fills.forEach((fill, index) => {
            if (fill.color) {
              const color = fill.color;
              const r = Math.round(color.r * 255);
              const g = Math.round(color.g * 255);
              const b = Math.round(color.b * 255);
              
              console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
              console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
            }
          });
        }
      }
      
      console.log('\n✅ hire-button-complete.json에 저장되었습니다.');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkHireButtonComplete();
