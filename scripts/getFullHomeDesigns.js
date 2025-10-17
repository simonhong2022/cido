const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const fileKey = process.env.FIGMA_FILE_KEY;
const accessToken = process.env.FIGMA_ACCESS_TOKEN;

// HOME_Web의 실제 페이지 (136-7356)
const webId = '136-7356';
const tabletId = '143:8589';
const mobileId = '152:9495';

async function getNodeDetails(nodeId) {
  const response = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`,
    { headers: { 'X-Figma-Token': accessToken } }
  );
  return response.data.nodes[nodeId.replace('-', ':')];
}

async function analyzeAllSections() {
  console.log('🔍 Home 페이지 전체 섹션 분석 중...\n');
  
  const [web, tablet, mobile] = await Promise.all([
    getNodeDetails(webId),
    getNodeDetails(tabletId),
    getNodeDetails(mobileId)
  ]);
  
  const result = {
    web: analyzeSections(web.document),
    tablet: analyzeSections(tablet.document),
    mobile: analyzeSections(mobile.document)
  };
  
  // 저장
  fs.writeFileSync('home-full-responsive.json', JSON.stringify(result, null, 2));
  
  console.log('✅ 전체 섹션 분석 완료: home-full-responsive.json\n');
  
  // 요약 출력
  printSummary(result);
}

function analyzeSections(node) {
  const sections = [];
  
  function traverse(n, depth = 0) {
    if (!n) return;
    
    // Frame 1261154919 (메인 컨테이너) 찾기
    if (n.name && n.name.includes('Frame 1261154919')) {
      if (n.children) {
        n.children.forEach(child => {
          sections.push({
            name: child.name,
            id: child.id,
            type: child.type,
            width: child.absoluteBoundingBox?.width || 0,
            height: child.absoluteBoundingBox?.height || 0,
            fills: child.fills,
            children: analyzeChildren(child)
          });
        });
      }
    }
    
    if (n.children) {
      n.children.forEach(child => traverse(child, depth + 1));
    }
  }
  
  traverse(node);
  
  return {
    name: node.name,
    width: node.absoluteBoundingBox?.width || 0,
    height: node.absoluteBoundingBox?.height || 0,
    sections: sections
  };
}

function analyzeChildren(node) {
  if (!node.children) return [];
  
  return node.children.map(child => ({
    name: child.name,
    type: child.type,
    width: child.absoluteBoundingBox?.width || 0,
    height: child.absoluteBoundingBox?.height || 0
  }));
}

function printSummary(result) {
  ['web', 'tablet', 'mobile'].forEach(device => {
    const spec = result[device];
    console.log(`📱 ${device.toUpperCase()}:`);
    console.log(`   프레임: ${spec.width}px × ${spec.height}px`);
    console.log(`   섹션 수: ${spec.sections.length}개\n`);
    
    spec.sections.forEach((section, index) => {
      console.log(`   ${index + 1}. ${section.name}`);
      console.log(`      크기: ${section.width}px × ${section.height}px`);
      console.log(`      자식 요소: ${section.children.length}개`);
    });
    console.log('\n');
  });
}

analyzeAllSections().catch(error => {
  console.error('Error:', error.response?.data || error.message);
});

