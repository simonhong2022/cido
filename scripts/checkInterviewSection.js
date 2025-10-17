const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkInterviewSection() {
  try {
    console.log('Interview 섹션 (Frame 1261154907) 체크 중...\n');
    
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
    
    // Interview 프레임 찾기 (ID: 143:8085)
    const interviewFrame = findNodeById(document, '143:8085');
    
    if (interviewFrame) {
      console.log('======================================================================');
      console.log('📐 Interview 섹션 (ID: 143:8085) 분석:');
      console.log('======================================================================\n');
      
      console.log('프레임 정보:');
      console.log(`  이름: ${interviewFrame.name}`);
      console.log(`  타입: ${interviewFrame.type}`);
      
      if (interviewFrame.absoluteBoundingBox) {
        console.log(`  크기: ${interviewFrame.absoluteBoundingBox.width}px × ${interviewFrame.absoluteBoundingBox.height}px`);
      }
      
      console.log('\n하위 요소들:');
      
      if (interviewFrame.children) {
        interviewFrame.children.forEach((child, index) => {
          console.log(`\n${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
          
          if (child.absoluteBoundingBox) {
            console.log(`   크기: ${child.absoluteBoundingBox.width}px × ${child.absoluteBoundingBox.height}px`);
          }
          
          // Frame 1261154907 상세 분석
          if (child.id === '143:8086') {
            console.log('\n   📋 Frame 1261154907 상세:');
            
            if (child.fills) {
              console.log('   배경:');
              child.fills.forEach((fill, fillIndex) => {
                console.log(`     Fill ${fillIndex + 1}: ${fill.type}`);
                
                if (fill.type === 'IMAGE') {
                  console.log(`       이미지 참조: ${fill.imageRef}`);
                  console.log(`       스케일 모드: ${fill.scaleMode}`);
                }
                
                if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops) {
                  console.log(`       그라데이션:`);
                  fill.gradientStops.forEach((stop, stopIndex) => {
                    const color = stop.color;
                    console.log(`         Stop ${stopIndex + 1} (${stop.position}): rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`);
                  });
                }
              });
            }
            
            if (child.children) {
              console.log('\n   하위 요소:');
              child.children.forEach((subChild, subIndex) => {
                console.log(`     ${subIndex + 1}. ${subChild.name} (${subChild.type})`);
                
                if (subChild.type === 'TEXT' && subChild.characters) {
                  console.log(`        텍스트: "${subChild.characters}"`);
                  
                  if (subChild.style) {
                    console.log(`        폰트: ${subChild.style.fontFamily} ${subChild.style.fontSize}px, weight ${subChild.style.fontWeight}`);
                  }
                  
                  if (subChild.fills && subChild.fills[0] && subChild.fills[0].color) {
                    const color = subChild.fills[0].color;
                    console.log(`        색상: #${Math.round(color.r * 255).toString(16).padStart(2, '0')}${Math.round(color.g * 255).toString(16).padStart(2, '0')}${Math.round(color.b * 255).toString(16).padStart(2, '0')}`);
                  }
                }
              });
            }
          }
        });
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkInterviewSection();
