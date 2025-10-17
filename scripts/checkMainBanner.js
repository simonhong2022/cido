const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkMainBanner() {
  try {
    console.log('Main_Banner 상세 체크 중...\n');
    
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
    
    // Main_Banner 찾기 (ID: 136:7598)
    const mainBanner = findNodeById(document, '136:7598');
    
    if (mainBanner) {
      console.log('======================================================================');
      console.log('📐 Main_Banner 디자인:');
      console.log('======================================================================\n');
      
      if (mainBanner.absoluteBoundingBox) {
        console.log('크기:', mainBanner.absoluteBoundingBox.width, 'x', mainBanner.absoluteBoundingBox.height);
      }
      
      // 배경 이미지 확인
      if (mainBanner.fills) {
        console.log('\n배경:');
        mainBanner.fills.forEach((fill, index) => {
          console.log(`  Fill ${index + 1}: ${fill.type}`);
          if (fill.imageRef) {
            console.log(`    이미지 참조: ${fill.imageRef}`);
          }
        });
      }
      
      // Title 찾기
      const titleFrame = findNodeById(mainBanner, '136:7452');
      
      if (titleFrame && titleFrame.children) {
        console.log('\nTitle 프레임 (텍스트 영역):');
        
        titleFrame.children.forEach(child => {
          if (child.type === 'TEXT') {
            console.log(`\n  "${child.characters}"`);
            
            if (child.absoluteBoundingBox) {
              console.log(`    위치: X=${child.absoluteBoundingBox.x}, Y=${child.absoluteBoundingBox.y}`);
              console.log(`    크기: ${child.absoluteBoundingBox.width}px × ${child.absoluteBoundingBox.height}px`);
            }
            
            if (child.style) {
              console.log(`    폰트: ${child.style.fontFamily}`);
              console.log(`    크기: ${child.style.fontSize}px`);
              console.log(`    두께: ${child.style.fontWeight}`);
            }
            
            if (child.fills && child.fills[0] && child.fills[0].color) {
              const color = child.fills[0].color;
              const r = Math.round(color.r * 255);
              const g = Math.round(color.g * 255);
              const b = Math.round(color.b * 255);
              console.log(`    색상: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
            }
          }
        });
      }
      
      // Button 찾기
      const buttonFrame = findNodeById(mainBanner, '136:7455');
      
      if (buttonFrame && buttonFrame.children) {
        console.log('\n\nButton 프레임:');
        
        if (buttonFrame.absoluteBoundingBox) {
          console.log(`  위치: X=${buttonFrame.absoluteBoundingBox.x}, Y=${buttonFrame.absoluteBoundingBox.y}`);
          console.log(`  크기: ${buttonFrame.absoluteBoundingBox.width}px × ${buttonFrame.absoluteBoundingBox.height}px`);
        }
        
        console.log('\n  버튼들:');
        
        buttonFrame.children.forEach(button => {
          console.log(`\n    ${button.name} (${button.type})`);
          
          if (button.absoluteBoundingBox) {
            console.log(`      크기: ${button.absoluteBoundingBox.width}px × ${button.absoluteBoundingBox.height}px`);
          }
          
          if (button.fills) {
            button.fills.forEach(fill => {
              if (fill.type === 'SOLID' && fill.color) {
                const color = fill.color;
                const r = Math.round(color.r * 255);
                const g = Math.round(color.g * 255);
                const b = Math.round(color.b * 255);
                console.log(`      배경: rgba(${r}, ${g}, ${b}, ${fill.opacity || 1})`);
              }
            });
          }
          
          if (button.cornerRadius) {
            console.log(`      border-radius: ${button.cornerRadius}px`);
          }
          
          // 버튼 텍스트 찾기
          if (button.children) {
            button.children.forEach(child => {
              if (child.type === 'TEXT') {
                console.log(`      텍스트: "${child.characters}"`);
                
                if (child.style) {
                  console.log(`      폰트: ${child.style.fontSize}px, weight ${child.style.fontWeight}`);
                }
                
                if (child.fills && child.fills[0] && child.fills[0].color) {
                  const color = child.fills[0].color;
                  const r = Math.round(color.r * 255);
                  const g = Math.round(color.g * 255);
                  const b = Math.round(color.b * 255);
                  console.log(`      색상: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
                }
              }
            });
          }
        });
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkMainBanner();
