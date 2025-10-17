const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkHOME_WebDetails() {
  try {
    console.log('HOME_Web 디테일 체크 중...\n');
    
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
    
    // HOME_Web 찾기
    const homeWeb = findNodeById(document, '332:3373');
    
    if (homeWeb) {
      console.log('======================================================================');
      console.log('📐 HOME_Web (히어로 섹션) 디자인:');
      console.log('======================================================================\n');
      
      console.log('전체 크기:', homeWeb.absoluteBoundingBox?.width, 'x', homeWeb.absoluteBoundingBox?.height);
      
      // 배경색 확인
      if (homeWeb.backgroundColor) {
        const bg = homeWeb.backgroundColor;
        const r = Math.round(bg.r * 255);
        const g = Math.round(bg.g * 255);
        const b = Math.round(bg.b * 255);
        console.log(`배경색: rgba(${r}, ${g}, ${b}, ${bg.a})`);
        console.log(`배경색 HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
      }
      
      // 텍스트 확인
      const textNode = findNodeById(homeWeb, 'I332:3373;1:1135');
      
      if (textNode) {
        console.log('\n텍스트:');
        console.log(`  내용: "${textNode.characters}"`);
        
        if (textNode.absoluteBoundingBox) {
          console.log(`  위치: X=${textNode.absoluteBoundingBox.x}, Y=${textNode.absoluteBoundingBox.y}`);
          console.log(`  크기: ${textNode.absoluteBoundingBox.width}px × ${textNode.absoluteBoundingBox.height}px`);
        }
        
        if (textNode.style) {
          console.log(`  폰트: ${textNode.style.fontFamily}`);
          console.log(`  크기: ${textNode.style.fontSize}px`);
          console.log(`  두께: ${textNode.style.fontWeight}`);
          console.log(`  정렬: ${textNode.style.textAlignHorizontal}`);
        }
        
        if (textNode.fills && textNode.fills[0] && textNode.fills[0].color) {
          const color = textNode.fills[0].color;
          const r = Math.round(color.r * 255);
          const g = Math.round(color.g * 255);
          const b = Math.round(color.b * 255);
          console.log(`  색상: rgba(${r}, ${g}, ${b}, ${color.a})`);
          console.log(`  색상 HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
        }
      }
      
      // 그래픽 확인
      const graphicNode = findNodeById(homeWeb, 'I332:3373;1:1136');
      
      if (graphicNode && graphicNode.absoluteBoundingBox) {
        console.log('\n그래픽:');
        console.log(`  위치: X=${graphicNode.absoluteBoundingBox.x}, Y=${graphicNode.absoluteBoundingBox.y}`);
        console.log(`  크기: ${graphicNode.absoluteBoundingBox.width}px × ${graphicNode.absoluteBoundingBox.height}px`);
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkHOME_WebDetails();
