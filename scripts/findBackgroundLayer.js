const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function findBackgroundLayer() {
  try {
    console.log('배경 이미지 레이어만 찾는 중...\n');
    
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
    
    // Frame 1261154907 찾기
    const bgFrame = findNodeById(document, '136:7719');
    
    if (bgFrame) {
      console.log('======================================================================');
      console.log('Frame 1261154907 하위 요소들:');
      console.log('======================================================================\n');
      
      if (bgFrame.children) {
        bgFrame.children.forEach((child, index) => {
          console.log(`${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
          
          if (child.fills) {
            console.log(`   fills 개수: ${child.fills.length}`);
            child.fills.forEach((fill, fillIndex) => {
              console.log(`     ${fillIndex + 1}. 타입: ${fill.type}`);
              if (fill.imageRef) {
                console.log(`        이미지 참조: ${fill.imageRef}`);
              }
            });
          }
          
          if (child.type === 'RECTANGLE' && child.fills && child.fills.some(f => f.type === 'IMAGE')) {
            console.log(`   ⭐ 이것이 배경 이미지 레이어입니다!`);
          }
        });
      }
      
      console.log('\n======================================================================');
      console.log('해결 방법:');
      console.log('======================================================================\n');
      console.log('1. Figma 편집 모드에서 Frame 1261154907을 선택');
      console.log('2. 텍스트 레이어들(Frame 1261154906, Button)을 숨김 처리 (눈 아이콘 클릭)');
      console.log('3. 배경 이미지만 보이는 상태에서 이미지를 다시 가져오기');
      console.log('\n또는:');
      console.log('배경 이미지 레이어(RECTANGLE)의 ID만 사용해서 이미지 가져오기');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

findBackgroundLayer();
