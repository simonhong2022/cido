const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function findExactIconIds() {
  try {
    console.log('정확한 아이콘 ID들을 찾는 중...\n');
    
    const figmaData = await getFigmaData();
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
    
    // Main_bilder 프레임 찾기
    const mainBilderFrame = findNodeById(document, '136:7360');
    
    if (mainBilderFrame && mainBilderFrame.children) {
      console.log('======================================================================');
      console.log('Main_bilder 프레임 내부의 정확한 구조:');
      console.log('======================================================================\n');
      
      mainBilderFrame.children.forEach((card, cardIndex) => {
        console.log(`카드 ${cardIndex + 1}: ${card.name} (${card.id})`);
        
        if (card.children) {
          card.children.forEach((frame, frameIndex) => {
            console.log(`  ${frameIndex + 1}. ${frame.name} (${frame.id})`);
            
            if (frame.children) {
              frame.children.forEach((child, childIndex) => {
                console.log(`     ${childIndex + 1}. ${child.name} (${child.id})`);
                
                if (child.children) {
                  child.children.forEach((grandChild, grandChildIndex) => {
                    console.log(`        ${grandChildIndex + 1}. ${grandChild.name} (${grandChild.id})`);
                    
                    if (grandChild.children) {
                      grandChild.children.forEach((greatGrandChild, greatGrandChildIndex) => {
                        console.log(`           ${greatGrandChildIndex + 1}. ${greatGrandChild.name} (${greatGrandChild.id})`);
                      });
                    }
                  });
                }
              });
            }
          });
        }
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

async function getFigmaData() {
  const response = await axios.get(`https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}`, {
    headers: {
      'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
    },
  });
  return response.data;
}

findExactIconIds();
