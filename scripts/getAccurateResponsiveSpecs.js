const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const fileKey = process.env.FIGMA_FILE_KEY;
const accessToken = process.env.FIGMA_ACCESS_TOKEN;

// Section 안의 Web 프레임 ID를 찾기
async function getWebFrameIds() {
  const sectionIds = '143:8587,143:8588,152:9306';
  
  const response = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${sectionIds}`,
    { headers: { 'X-Figma-Token': accessToken } }
  );
  
  const nodes = response.data.nodes;
  const webFrameIds = {};
  
  Object.entries(nodes).forEach(([id, data]) => {
    const node = data.document;
    if (node.children && node.children.length > 0) {
      const webFrame = node.children[0]; // Web 프레임
      webFrameIds[node.name.toLowerCase()] = webFrame.id;
    }
  });
  
  return webFrameIds;
}

async function analyzeAllDevices() {
  console.log('🔍 Figma Home 페이지 디바이스별 상세 분석 중...\n');
  
  // 1. Web 프레임 ID 가져오기
  const webFrameIds = await getWebFrameIds();
  console.log('Web 프레임 IDs:', webFrameIds);
  console.log('');
  
  // 2. 각 디바이스의 상세 정보 가져오기
  const ids = Object.values(webFrameIds).join(',');
  const response = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${ids}`,
    { headers: { 'X-Figma-Token': accessToken } }
  );
  
  const result = {};
  
  Object.entries(webFrameIds).forEach(([device, frameId]) => {
    const nodeData = response.data.nodes[frameId];
    if (nodeData) {
      result[device] = analyzeFrame(nodeData.document);
    }
  });
  
  // 3. 저장
  fs.writeFileSync('accurate-responsive-specs.json', JSON.stringify(result, null, 2));
  
  console.log('✅ 디바이스별 상세 스펙 저장 완료: accurate-responsive-specs.json\n');
  
  // 4. 요약 출력
  printDeviceSummary(result);
}

function analyzeFrame(node) {
  const sections = [];
  
  if (node.children) {
    node.children.forEach(child => {
      sections.push({
        name: child.name,
        id: child.id,
        type: child.type,
        width: Math.round(child.absoluteBoundingBox?.width || 0),
        height: Math.round(child.absoluteBoundingBox?.height || 0),
        x: Math.round(child.absoluteBoundingBox?.x || 0),
        y: Math.round(child.absoluteBoundingBox?.y || 0)
      });
    });
  }
  
  return {
    name: node.name,
    width: Math.round(node.absoluteBoundingBox?.width || 0),
    height: Math.round(node.absoluteBoundingBox?.height || 0),
    sections: sections
  };
}

function printDeviceSummary(result) {
  ['desktop', 'tablet', 'mobile'].forEach(device => {
    if (!result[device]) return;
    
    const spec = result[device];
    console.log(`📱 ${device.toUpperCase()}:`);
    console.log(`   프레임: ${spec.width}px × ${spec.height}px`);
    console.log(`   섹션 수: ${spec.sections.length}개\n`);
    
    spec.sections.forEach((section, index) => {
      console.log(`   ${index + 1}. ${section.name}`);
      console.log(`      크기: ${section.width}px × ${section.height}px`);
    });
    console.log('\n');
  });
}

analyzeAllDevices().catch(error => {
  console.error('Error:', error.response?.data || error.message);
});

