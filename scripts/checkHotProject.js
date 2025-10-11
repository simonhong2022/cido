const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function checkHotProject() {
  try {
    console.log('Hot_Project 섹션 체크 중...\n');
    
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
    
    // Hot_Project 찾기 (ID: 136:7716)
    const hotProject = findNodeById(document, '136:7716');
    
    if (hotProject) {
      console.log('======================================================================');
      console.log('📐 Hot_Project 섹션 분석:');
      console.log('======================================================================\n');
      
      console.log('프레임 정보:');
      console.log(`  이름: ${hotProject.name}`);
      console.log(`  타입: ${hotProject.type}`);
      
      if (hotProject.absoluteBoundingBox) {
        console.log(`  크기: ${hotProject.absoluteBoundingBox.width}px × ${hotProject.absoluteBoundingBox.height}px`);
      }
      
      if (hotProject.backgroundColor) {
        const bg = hotProject.backgroundColor;
        const r = Math.round(bg.r * 255);
        const g = Math.round(bg.g * 255);
        const b = Math.round(bg.b * 255);
        console.log(`  배경색: rgba(${r}, ${g}, ${b}, ${bg.a})`);
        console.log(`  배경색 HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
      }
      
      console.log('\n하위 요소들:');
      
      function analyzeChildren(node, indent = '') {
        if (node.children) {
          node.children.forEach((child, index) => {
            console.log(`${indent}${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
            
            if (child.absoluteBoundingBox) {
              console.log(`${indent}   위치: X=${child.absoluteBoundingBox.x}, Y=${child.absoluteBoundingBox.y}`);
              console.log(`${indent}   크기: ${child.absoluteBoundingBox.width}px × ${child.absoluteBoundingBox.height}px`);
            }
            
            if (child.type === 'TEXT' && child.characters) {
              console.log(`${indent}   텍스트: "${child.characters}"`);
              
              if (child.style) {
                console.log(`${indent}   폰트: ${child.style.fontFamily} ${child.style.fontSize}px, weight ${child.style.fontWeight}`);
                
                if (child.fills && child.fills[0] && child.fills[0].color) {
                  const color = child.fills[0].color;
                  const r = Math.round(color.r * 255);
                  const g = Math.round(color.g * 255);
                  const b = Math.round(color.b * 255);
                  console.log(`${indent}   색상: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
                }
              }
            }
            
            // RECTANGLE 타입 확인 (배경 이미지)
            if (child.type === 'RECTANGLE' && child.fills) {
              const imageFill = child.fills.find(f => f.type === 'IMAGE');
              if (imageFill) {
                console.log(`${indent}   ⭐ 배경 이미지: imageRef=${imageFill.imageRef}`);
              }
            }
            
            // 2 레벨까지만 표시
            if (child.children && indent.length < 6) {
              analyzeChildren(child, indent + '   ');
            }
          });
        }
      }
      
      analyzeChildren(hotProject);
      
      // JSON 저장
      fs.writeFileSync('hot-project-detail.json', JSON.stringify(hotProject, null, 2));
      console.log('\n✅ hot-project-detail.json에 저장되었습니다.');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkHotProject();
