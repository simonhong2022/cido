/**
 * 비슷한 Frame ID 검색
 */

const fs = require('fs');

async function searchSimilarFrame() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function searchNodes(node, depth = 0) {
      const indent = '  '.repeat(depth);
      
      // Frame 12611547로 시작하는 ID 찾기
      if (node.id && node.id.includes('12611547')) {
        console.log(`${indent}🎯 발견: ${node.name} - ID: ${node.id}`);
        console.log(`${indent}   타입: ${node.type}`);
        
        if (node.absoluteBoundingBox) {
          const { x, y, width, height } = node.absoluteBoundingBox;
          console.log(`${indent}   위치: x:${Math.round(x)}, y:${Math.round(y)}, 크기: ${Math.round(width)}x${Math.round(height)}`);
        }
        
        // 자식 요소들도 확인
        if (node.children && node.children.length > 0) {
          console.log(`${indent}   자식 요소 (${node.children.length}개):`);
          node.children.forEach(child => {
            console.log(`${indent}     - ${child.name} (${child.type}) - ID: ${child.id}`);
            if (child.type === 'TEXT' && child.characters) {
              console.log(`${indent}       텍스트: "${child.characters}"`);
            }
          });
        }
        console.log('');
      }
      
      if (node.children) {
        node.children.forEach(child => searchNodes(child, depth + 1));
      }
    }
    
    console.log('Frame 12611547로 시작하는 ID 검색 중...\n');
    console.log('='.repeat(70));
    
    searchNodes(data.document);
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

searchSimilarFrame();
