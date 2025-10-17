const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const fileKey = process.env.FIGMA_FILE_KEY;
const accessToken = process.env.FIGMA_ACCESS_TOKEN;

// HOME_Web, HOME_Tablet, HOME_mobile의 ID
const ids = '1:1116,143:8589,152:9495';

axios.get(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${ids}`, {
  headers: { 'X-Figma-Token': accessToken }
})
.then(response => {
  const nodes = response.data.nodes;
  
  const result = {
    web: null,
    tablet: null,
    mobile: null
  };
  
  Object.entries(nodes).forEach(([id, data]) => {
    const node = data.document;
    
    if (node.name === 'HOME_Web') {
      result.web = analyzeNode(node);
    } else if (node.name === 'HOME_Tablet') {
      result.tablet = analyzeNode(node);
    } else if (node.name === 'HOME_mobile') {
      result.mobile = analyzeNode(node);
    }
  });
  
  // 파일로 저장
  fs.writeFileSync('responsive-designs.json', JSON.stringify(result, null, 2));
  
  console.log('✅ 반응형 디자인 스펙 저장 완료: responsive-designs.json\n');
  
  // 요약 출력
  console.log('📱 디바이스별 스펙 요약:\n');
  
  ['web', 'tablet', 'mobile'].forEach(device => {
    const spec = result[device];
    console.log(`${device.toUpperCase()}:`);
    console.log(`  - 프레임 크기: ${spec.width}px × ${spec.height}px`);
    console.log(`  - 섹션 수: ${spec.sections.length}개`);
    console.log(`  - 주요 섹션:`);
    spec.sections.slice(0, 5).forEach(section => {
      console.log(`    • ${section.name} (${section.width}px × ${section.height}px)`);
    });
    console.log('');
  });
})
.catch(error => {
  console.error('Error:', error.response?.data || error.message);
});

function analyzeNode(node) {
  const sections = [];
  
  if (node.children) {
    node.children.forEach(child => {
      sections.push({
        name: child.name,
        id: child.id,
        type: child.type,
        width: child.absoluteBoundingBox?.width || 0,
        height: child.absoluteBoundingBox?.height || 0,
        x: child.absoluteBoundingBox?.x || 0,
        y: child.absoluteBoundingBox?.y || 0,
        children: child.children?.length || 0
      });
    });
  }
  
  return {
    name: node.name,
    id: node.id,
    width: node.absoluteBoundingBox.width,
    height: node.absoluteBoundingBox.height,
    sections: sections
  };
}

