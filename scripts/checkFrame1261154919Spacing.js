const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkFrame1261154919Spacing() {
  try {
    console.log('Frame 1261154919 내부 섹션 간격 체크 중...\n');
    
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
    
    // Frame 1261154919 찾기 (ID: 333:2425)
    const frame = findNodeById(document, '333:2425');
    
    if (frame && frame.children) {
      console.log('======================================================================');
      console.log('📐 Frame 1261154919 내부 섹션들:');
      console.log('======================================================================\n');
      
      const sections = [];
      
      frame.children.forEach(child => {
        if (child.absoluteBoundingBox) {
          sections.push({
            name: child.name,
            id: child.id,
            y: child.absoluteBoundingBox.y,
            height: child.absoluteBoundingBox.height,
            bottom: child.absoluteBoundingBox.y + child.absoluteBoundingBox.height
          });
        }
      });
      
      // Y 위치로 정렬
      sections.sort((a, b) => a.y - b.y);
      
      sections.forEach((section, index) => {
        console.log(`${index + 1}. ${section.name} (ID: ${section.id})`);
        console.log(`   Y: ${section.y}`);
        console.log(`   높이: ${section.height}px`);
        console.log(`   아래쪽: ${section.bottom}`);
        
        if (index > 0) {
          const prevSection = sections[index - 1];
          const gap = section.y - prevSection.bottom;
          console.log(`   ⬆️  위 섹션과의 간격: ${gap}px`);
        }
        console.log('');
      });
      
      console.log('======================================================================');
      console.log('섹션 간격 요약:');
      console.log('======================================================================\n');
      
      for (let i = 1; i < sections.length; i++) {
        const gap = sections[i].y - sections[i - 1].bottom;
        console.log(`${sections[i - 1].name} → ${sections[i].name}: ${gap}px`);
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkFrame1261154919Spacing();
