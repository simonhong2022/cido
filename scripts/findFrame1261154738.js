/**
 * Frame 1261154738 찾기 및 아이콘 분석
 */

const fs = require('fs');

async function findFrame1261154738() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function findNodeById(node, targetId) {
      if (node.id === targetId) return node;
      if (node.children) {
        for (let child of node.children) {
          const found = findNodeById(child, targetId);
          if (found) return found;
        }
      }
      return null;
    }
    
    function analyzeNode(node, depth = 0) {
      const indent = '  '.repeat(depth);
      console.log(`${indent}${node.name} (${node.type}) - ID: ${node.id}`);
      
      if (node.absoluteBoundingBox) {
        const { x, y, width, height } = node.absoluteBoundingBox;
        console.log(`${indent}  위치: x:${Math.round(x)}, y:${Math.round(y)}, 크기: ${Math.round(width)}x${Math.round(height)}`);
      }
      
      if (node.type === 'TEXT' && node.characters) {
        console.log(`${indent}  텍스트: "${node.characters}"`);
      }
      
      if (node.fills && node.fills.length > 0) {
        node.fills.forEach((fill, idx) => {
          if (fill.type === 'SOLID') {
            const color = fill.color;
            console.log(`${indent}  색상: rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`);
          }
        });
      }
      
      if (node.children && node.children.length > 0) {
        console.log(`${indent}  자식 요소 (${node.children.length}개):`);
        node.children.forEach(child => analyzeNode(child, depth + 1));
      }
    }
    
    // Frame 1261154738 찾기
    const targetFrame = findNodeById(data.document, '1261154738');
    
    if (!targetFrame) {
      console.log('❌ Frame 1261154738을 찾을 수 없습니다.');
      return;
    }
    
    console.log('Frame 1261154738 발견!\n');
    console.log('='.repeat(70));
    analyzeNode(targetFrame);
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

findFrame1261154738();
