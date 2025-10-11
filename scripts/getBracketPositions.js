const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getBracketPositions() {
  try {
    console.log('괄호 벡터 정확한 위치 계산 중...\n');
    
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
    
    // HOME_Web 프레임
    const homeWeb = findNodeById(document, '332:3373');
    
    if (homeWeb && homeWeb.absoluteBoundingBox) {
      const frameX = homeWeb.absoluteBoundingBox.x;
      const frameY = homeWeb.absoluteBoundingBox.y;
      const frameWidth = homeWeb.absoluteBoundingBox.width;
      const frameHeight = homeWeb.absoluteBoundingBox.height;
      
      console.log('======================================================================');
      console.log('HOME_Web 프레임:');
      console.log('======================================================================\n');
      console.log(`위치: X=${frameX}, Y=${frameY}`);
      console.log(`크기: ${frameWidth}px × ${frameHeight}px`);
      
      // 그래픽 노드 찾기
      const graphic = findNodeById(homeWeb, 'I332:3373;1:1136');
      
      if (graphic && graphic.absoluteBoundingBox) {
        console.log('\n그래픽 (대괄호들):');
        console.log(`절대 위치: X=${graphic.absoluteBoundingBox.x}, Y=${graphic.absoluteBoundingBox.y}`);
        console.log(`크기: ${graphic.absoluteBoundingBox.width}px × ${graphic.absoluteBoundingBox.height}px`);
        
        // 프레임 기준 상대 위치 계산
        const relativeX = graphic.absoluteBoundingBox.x - frameX;
        const relativeY = graphic.absoluteBoundingBox.y - frameY;
        
        console.log(`\n프레임 기준 상대 위치:`);
        console.log(`  왼쪽에서: ${relativeX}px`);
        console.log(`  위에서: ${relativeY}px`);
        
        // 중앙 기준 계산
        const centerX = frameWidth / 2;
        const centerY = frameHeight / 2;
        const graphicCenterX = relativeX + (graphic.absoluteBoundingBox.width / 2);
        const graphicCenterY = relativeY + (graphic.absoluteBoundingBox.height / 2);
        
        console.log(`\n중앙 기준:`);
        console.log(`  프레임 중앙: X=${centerX}, Y=${centerY}`);
        console.log(`  그래픽 중앙: X=${graphicCenterX}, Y=${graphicCenterY}`);
        
        // 개별 벡터 확인
        if (graphic.children) {
          console.log('\n개별 벡터들:');
          graphic.children.forEach((vector, index) => {
            if (vector.absoluteBoundingBox) {
              const vecRelX = vector.absoluteBoundingBox.x - frameX;
              const vecRelY = vector.absoluteBoundingBox.y - frameY;
              
              console.log(`\n  벡터 ${index + 1}:`);
              console.log(`    절대 위치: X=${vector.absoluteBoundingBox.x}, Y=${vector.absoluteBoundingBox.y}`);
              console.log(`    프레임 기준: left=${vecRelX}px, top=${vecRelY}px`);
              console.log(`    크기: ${vector.absoluteBoundingBox.width}px × ${vector.absoluteBoundingBox.height}px`);
              
              // 오른쪽 기준 계산
              const fromRight = frameWidth - (vecRelX + vector.absoluteBoundingBox.width);
              console.log(`    오른쪽에서: ${fromRight}px`);
            }
          });
        }
      }
      
      // 텍스트 위치 확인
      const textNode = findNodeById(homeWeb, 'I332:3373;1:1135');
      
      if (textNode && textNode.absoluteBoundingBox) {
        console.log('\n\n텍스트 "시도는 멈추지 않는다.":');
        console.log(`절대 위치: X=${textNode.absoluteBoundingBox.x}, Y=${textNode.absoluteBoundingBox.y}`);
        
        const textRelX = textNode.absoluteBoundingBox.x - frameX;
        const textRelY = textNode.absoluteBoundingBox.y - frameY;
        
        console.log(`프레임 기준: left=${textRelX}px, top=${textRelY}px`);
        console.log(`크기: ${textNode.absoluteBoundingBox.width}px × ${textNode.absoluteBoundingBox.height}px`);
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

getBracketPositions();
