const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getMainBannerGradient() {
  try {
    console.log('Main_Banner 그라데이션 정보 추출 중...\n');
    
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
    
    const mainBanner = findNodeById(document, '136:7598');
    
    if (mainBanner && mainBanner.fills) {
      console.log('======================================================================');
      console.log('Main_Banner 배경 Fill 정보:');
      console.log('======================================================================\n');
      
      mainBanner.fills.forEach((fill, index) => {
        console.log(`Fill ${index + 1}:`);
        console.log(`  타입: ${fill.type}`);
        console.log(`  visible: ${fill.visible !== false ? 'true' : 'false'}`);
        
        if (fill.type === 'IMAGE') {
          console.log(`  이미지 참조: ${fill.imageRef}`);
          console.log(`  불투명도: ${fill.opacity || 1}`);
          console.log(`  스케일 모드: ${fill.scaleMode}`);
        }
        
        if (fill.type === 'GRADIENT_LINEAR') {
          console.log(`  그라데이션 방향:`);
          if (fill.gradientHandlePositions) {
            console.log(`    시작점: (${fill.gradientHandlePositions[0].x}, ${fill.gradientHandlePositions[0].y})`);
            console.log(`    끝점: (${fill.gradientHandlePositions[1].x}, ${fill.gradientHandlePositions[1].y})`);
          }
          
          console.log(`  그라데이션 색상:`);
          if (fill.gradientStops) {
            fill.gradientStops.forEach((stop, stopIndex) => {
              const color = stop.color;
              const r = Math.round(color.r * 255);
              const g = Math.round(color.g * 255);
              const b = Math.round(color.b * 255);
              
              console.log(`    Stop ${stopIndex + 1} (position: ${stop.position}):`);
              console.log(`      rgba(${r}, ${g}, ${b}, ${color.a})`);
            });
          }
          
          console.log(`  블렌드 모드: ${fill.blendMode}`);
        }
        
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

getMainBannerGradient();
