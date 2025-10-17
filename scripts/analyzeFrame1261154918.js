const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function analyzeFrame1261154918() {
  try {
    console.log('Frame 1261154918 분석 중...\n');
    
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
    
    const frame = findNodeById(document, '143:8124');
    
    if (frame) {
      console.log('======================================================================');
      console.log('Frame 1261154918 정보:');
      console.log('======================================================================\n');
      console.log('이름:', frame.name);
      console.log('타입:', frame.type);
      console.log('ID:', frame.id);
      
      if (frame.children) {
        console.log('\n하위 요소들:');
        frame.children.forEach((child, index) => {
          console.log(`${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
          
          if (child.children && child.children.length > 0) {
            child.children.forEach((subChild, subIndex) => {
              console.log(`   ${subIndex + 1}. ${subChild.name} (${subChild.type}) - ID: ${subChild.id}`);
            });
          }
        });
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

analyzeFrame1261154918();
