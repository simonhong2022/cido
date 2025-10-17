/**
 * Main_bilder 프레임의 배경 레이어 찾기
 */

const fs = require('fs');

async function getFrameBackgrounds() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function findNode(node, name) {
      if (node.name === name) return node;
      if (node.children) {
        for (let child of node.children) {
          const found = findNode(child, name);
          if (found) return found;
        }
      }
      return null;
    }
    
    function analyzeFrame(frame, frameName) {
      console.log(`\n${frameName} 분석:`);
      console.log(`  타입: ${frame.type}`);
      console.log(`  크기: ${frame.absoluteBoundingBox?.width} x ${frame.absoluteBoundingBox?.height}`);
      
      if (frame.fills && frame.fills.length > 0) {
        console.log(`  배경 채우기:`);
        frame.fills.forEach((fill, idx) => {
          console.log(`    ${idx + 1}. 타입: ${fill.type}`);
          if (fill.type === 'IMAGE') {
            console.log(`       이미지 참조: ${fill.imageRef}`);
            console.log(`       이미지 URL: ${fill.imageHash}`);
          } else if (fill.type === 'SOLID') {
            console.log(`       색상: ${fill.color ? `rgba(${Math.round(fill.color.r * 255)}, ${Math.round(fill.color.g * 255)}, ${Math.round(fill.color.b * 255)}, ${fill.color.a})` : 'N/A'}`);
          }
        });
      }
      
      if (frame.children && frame.children.length > 0) {
        console.log(`  자식 요소 (${frame.children.length}개):`);
        frame.children.forEach((child, idx) => {
          console.log(`    ${idx + 1}. ${child.name} (${child.type})`);
          if (child.fills && child.fills.length > 0) {
            child.fills.forEach(fill => {
              if (fill.type === 'IMAGE') {
                console.log(`       🖼️  이미지: ${fill.imageRef}`);
              }
            });
          }
        });
      }
    }
    
    const mainBilder = findNode(data.document, 'Main_bilder');
    if (!mainBilder || !mainBilder.children) {
      console.log('Main_bilder를 찾을 수 없습니다.');
      return;
    }
    
    console.log('Main_bilder 프레임 구조 분석:\n');
    console.log('='.repeat(70));
    
    mainBilder.children.forEach((card, idx) => {
      analyzeFrame(card, `카드 ${idx + 1}: ${card.name}`);
    });
    
    // 전체 Main_bilder 프레임도 분석
    console.log('\n' + '='.repeat(70));
    analyzeFrame(mainBilder, 'Main_bilder 전체');
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getFrameBackgrounds();
