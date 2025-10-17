const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const fileKey = process.env.FIGMA_FILE_KEY;
const accessToken = process.env.FIGMA_ACCESS_TOKEN;

// Tablet Navigation 상세 정보
const tabletNavId = '1:4555'; // HOME/Navigation_Logout_Tab

axios.get(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${tabletNavId}`, {
  headers: { 'X-Figma-Token': accessToken }
})
.then(response => {
  const node = response.data.nodes[tabletNavId].document;
  
  console.log('📱 Tablet Navigation (HOME/Navigation_Logout_Tab) 상세:\n');
  console.log(`크기: ${node.absoluteBoundingBox.width}px × ${node.absoluteBoundingBox.height}px\n`);
  
  console.log('자식 요소들:');
  node.children.forEach(child => {
    console.log(`  - ${child.name}`);
    console.log(`    크기: ${Math.round(child.absoluteBoundingBox?.width || 0)}px × ${Math.round(child.absoluteBoundingBox?.height || 0)}px`);
    console.log(`    타입: ${child.type}`);
    
    if (child.children && child.children.length > 0) {
      console.log(`    내부:`);
      child.children.slice(0, 5).forEach(subChild => {
        console.log(`      • ${subChild.name}`);
      });
    }
    console.log('');
  });
})
.catch(error => {
  console.error('Error:', error.response?.data || error.message);
});

