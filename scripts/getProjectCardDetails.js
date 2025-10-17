const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const fileKey = process.env.FIGMA_FILE_KEY;
const accessToken = process.env.FIGMA_ACCESS_TOKEN;

// Project 섹션
const frameId = '7:7719';

axios.get(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${frameId}`, {
  headers: { 'X-Figma-Token': accessToken }
})
.then(response => {
  const node = response.data.nodes[frameId].document;
  
  console.log('🔍 Project 섹션 카드 상세:\n');
  
  // Frame 1261154851 찾기
  const frame1 = node.children.find(c => c.name && c.name.includes('Frame 1261154851'));
  
  if (frame1 && frame1.children) {
    console.log('Frame 1261154851 (첫 번째 카드 그룹):\n');
    
    // 첫 번째 카드
    const firstCard = frame1.children[0];
    console.log(`첫 번째 카드: ${firstCard.name}`);
    console.log(`크기: ${Math.round(firstCard.absoluteBoundingBox.width)}px × ${Math.round(firstCard.absoluteBoundingBox.height)}px\n`);
    
    if (firstCard.children) {
      console.log('카드 내부 요소:');
      firstCard.children.forEach(item => {
        console.log(`  - ${item.name} (${item.type})`);
        
        if (item.type === 'TEXT') {
          console.log(`    내용: "${item.characters}"`);
          console.log(`    폰트: ${item.style?.fontSize}px, weight: ${item.style?.fontWeight}`);
          if (item.style?.fills && item.style.fills[0] && item.style.fills[0].color) {
            const fill = item.style.fills[0];
            const r = Math.round(fill.color.r * 255);
            const g = Math.round(fill.color.g * 255);
            const b = Math.round(fill.color.b * 255);
            console.log(`    색상: rgb(${r}, ${g}, ${b})`);
          }
        }
        console.log('');
      });
    }
  }
})
.catch(error => {
  console.error('Error:', error.response?.data || error.message);
});

