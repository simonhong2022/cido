/**
 * 아이콘들이 있는 프레임 찾기
 */

const fs = require('fs');

async function findIconFrames() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function searchForIcons(node, depth = 0, path = '') {
      const indent = '  '.repeat(depth);
      const currentPath = path ? `${path} > ${node.name}` : node.name;
      
      // 아이콘이나 버튼 같은 요소 찾기
      const isIconFrame = (
        node.name.toLowerCase().includes('icon') ||
        node.name.toLowerCase().includes('button') ||
        node.name.toLowerCase().includes('frame') && node.children && node.children.length > 1
      );
      
      if (isIconFrame && node.children && node.children.length >= 2) {
        console.log(`\n🎯 아이콘 프레임 발견: ${node.name}`);
        console.log(`${indent}ID: ${node.id}`);
        console.log(`${indent}경로: ${currentPath}`);
        
        if (node.absoluteBoundingBox) {
          const { x, y, width, height } = node.absoluteBoundingBox;
          console.log(`${indent}위치: x:${Math.round(x)}, y:${Math.round(y)}, 크기: ${Math.round(width)}x${Math.round(height)}`);
        }
        
        console.log(`${indent}자식 요소 (${node.children.length}개):`);
        node.children.forEach((child, idx) => {
          console.log(`${indent}  ${idx + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
          
          if (child.type === 'TEXT' && child.characters) {
            console.log(`${indent}     텍스트: "${child.characters}"`);
          }
          
          if (child.type === 'RECTANGLE' && child.fills) {
            const imageFill = child.fills.find(fill => fill.type === 'IMAGE');
            if (imageFill) {
              console.log(`${indent}     🖼️  이미지 아이콘: ${imageFill.imageRef}`);
            }
          }
        });
        console.log('');
      }
      
      if (node.children) {
        node.children.forEach(child => searchForIcons(child, depth + 1, currentPath));
      }
    }
    
    console.log('아이콘들이 있는 프레임 검색 중...\n');
    console.log('='.repeat(70));
    
    searchForIcons(data.document);
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

findIconFrames();
