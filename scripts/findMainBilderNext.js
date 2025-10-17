const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function findMainBilderNext() {
  try {
    console.log('Main_bilder 다음 섹션 찾는 중...\n');
    
    const response = await axios.get(`https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}`, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
      },
    });
    
    const figmaData = response.data;
    const document = figmaData.document;
    
    function findHomeFrame(node) {
      if (node.name && node.name === 'Web' && node.id === '136:7356') {
        return node;
      }
      
      if (node.children) {
        for (let child of node.children) {
          const found = findHomeFrame(child);
          if (found) return found;
        }
      }
      
      return null;
    }
    
    const homeFrame = findHomeFrame(document);
    
    if (homeFrame && homeFrame.children) {
      console.log('======================================================================');
      console.log('Home 페이지 (Web) 프레임의 모든 섹션:');
      console.log('======================================================================\n');
      
      homeFrame.children.forEach((child, index) => {
        console.log(`${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
        
        if (child.name === 'Main_bilder') {
          console.log('   ⬆️ Main_bilder 섹션');
          
          if (homeFrame.children[index + 1]) {
            console.log('   ⬇️ Main_bilder 다음 섹션:');
            const nextSection = homeFrame.children[index + 1];
            console.log(`   → ${nextSection.name} (${nextSection.type}) - ID: ${nextSection.id}`);
            
            if (nextSection.children) {
              console.log('\n   하위 요소들:');
              nextSection.children.forEach((subChild, subIndex) => {
                console.log(`      ${subIndex + 1}. ${subChild.name} (${subChild.type}) - ID: ${subChild.id}`);
              });
            }
          }
        }
      });
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

findMainBilderNext();
