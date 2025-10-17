const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const fileKey = process.env.FIGMA_FILE_KEY;
const accessToken = process.env.FIGMA_ACCESS_TOKEN;

async function getTextSpecs() {
  // Desktop의 Main_Banner (Hot_Project 안에 있음)
  // Tablet과 Mobile의 Hot_Project 찾기
  
  // Frame 1261154919 (Desktop) 안의 Hot_Project
  const desktopHotProjectId = '143:8125'; // 추정
  
  // Tablet Hot_Project
  const tabletHotProjectId = '143:8363';
  
  // Mobile Hot_Project  
  const mobileHotProjectId = '152:9311';
  
  const ids = `${desktopHotProjectId},${tabletHotProjectId},${mobileHotProjectId}`;
  
  console.log('🔍 Hot_Project 섹션 분석 중...\n');
  
  const response = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${ids}`,
    { headers: { 'X-Figma-Token': accessToken } }
  );
  
  const result = {};
  
  Object.entries(response.data.nodes).forEach(([id, data]) => {
    const node = data.document;
    const deviceName = id === desktopHotProjectId ? 'desktop' : (id === tabletHotProjectId ? 'tablet' : 'mobile');
    
    result[deviceName] = analyzeHotProject(node);
  });
  
  fs.writeFileSync('allvisual-text-specs.json', JSON.stringify(result, null, 2));
  
  console.log('✅ AllVisual 텍스트 스펙 저장: allvisual-text-specs.json\n');
  printSummary(result);
}

function analyzeHotProject(node) {
  const texts = [];
  
  function findTexts(n, depth = 0) {
    if (!n) return;
    
    if (n.type === 'TEXT') {
      texts.push({
        name: n.name,
        content: n.characters,
        fontSize: n.style?.fontSize,
        fontWeight: n.style?.fontWeight,
        x: Math.round(n.absoluteBoundingBox?.x || 0),
        y: Math.round(n.absoluteBoundingBox?.y || 0),
        width: Math.round(n.absoluteBoundingBox?.width || 0),
        height: Math.round(n.absoluteBoundingBox?.height || 0)
      });
    }
    
    if (n.children) {
      n.children.forEach(child => findTexts(child, depth + 1));
    }
  }
  
  findTexts(node);
  
  return {
    name: node.name,
    width: Math.round(node.absoluteBoundingBox?.width || 0),
    height: Math.round(node.absoluteBoundingBox?.height || 0),
    texts: texts
  };
}

function printSummary(result) {
  ['desktop', 'tablet', 'mobile'].forEach(device => {
    if (!result[device]) return;
    
    const spec = result[device];
    console.log(`📱 ${device.toUpperCase()}:`);
    console.log(`   크기: ${spec.width}px × ${spec.height}px\n`);
    
    spec.texts.forEach(text => {
      console.log(`   텍스트: "${text.content}"`);
      console.log(`     폰트: ${text.fontSize}px, weight: ${text.fontWeight}`);
      console.log(`     위치: left ${text.x}px, top ${text.y}px`);
      console.log(`     크기: ${text.width}px × ${text.height}px`);
      console.log('');
    });
  });
}

getTextSpecs().catch(error => {
  console.error('Error:', error.response?.data || error.message);
});

