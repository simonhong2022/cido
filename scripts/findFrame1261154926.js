const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function findFrame1261154926() {
  try {
    console.log('Frame 1261154926 찾는 중...\n');
    
    const response = await axios.get(`https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}`, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
      },
    });
    
    const figmaData = response.data;
    const document = figmaData.document;
    
    function findNodeByName(node, targetName, path = []) {
      const currentPath = [...path, node.name];
      
      if (node.name && node.name.includes(targetName)) {
        return {
          node: node,
          path: currentPath
        };
      }
      
      if (node.children) {
        for (let child of node.children) {
          const found = findNodeByName(child, targetName, currentPath);
          if (found) return found;
        }
      }
      
      return null;
    }
    
    const result = findNodeByName(document, '1261154926');
    
    if (result) {
      console.log('======================================================================');
      console.log('Frame 1261154926 찾음!');
      console.log('======================================================================\n');
      console.log('경로:', result.path.join(' > '));
      console.log('\n프레임 정보:');
      console.log('  이름:', result.node.name);
      console.log('  타입:', result.node.type);
      console.log('  ID:', result.node.id);
      
      if (result.node.children) {
        console.log('\n하위 요소들:');
        result.node.children.forEach((child, index) => {
          console.log(`  ${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
        });
      }
    } else {
      console.log('❌ Frame 1261154926을 찾을 수 없습니다.');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

findFrame1261154926();
