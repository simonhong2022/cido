const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function analyzeFrame1261154926Detail() {
  try {
    console.log('Frame 1261154926 상세 분석 중...\n');
    
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
    
    const frame = findNodeById(document, '332:3013');
    
    if (frame) {
      console.log('======================================================================');
      console.log('Frame 1261154926 상세 정보:');
      console.log('======================================================================\n');
      console.log('이름:', frame.name);
      console.log('타입:', frame.type);
      console.log('ID:', frame.id);
      
      if (frame.absoluteBoundingBox) {
        console.log('\n크기:');
        console.log('  너비:', frame.absoluteBoundingBox.width);
        console.log('  높이:', frame.absoluteBoundingBox.height);
      }
      
      if (frame.children) {
        console.log('\n하위 요소들:');
        
        function printChildren(children, indent = '') {
          children.forEach((child, index) => {
            console.log(`${indent}${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
            
            if (child.type === 'TEXT' && child.characters) {
              console.log(`${indent}   텍스트: "${child.characters}"`);
            }
            
            if (child.children && child.children.length > 0) {
              printChildren(child.children, indent + '   ');
            }
          });
        }
        
        printChildren(frame.children);
      }
      
      // JSON 파일로 저장
      fs.writeFileSync('frame-1261154926-detail.json', JSON.stringify(frame, null, 2));
      console.log('\n✅ frame-1261154926-detail.json에 저장되었습니다.');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

analyzeFrame1261154926Detail();
