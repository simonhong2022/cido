const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function checkHOME_Web() {
  try {
    console.log('HOME_Web 섹션 체크 중...\n');
    
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
    
    // HOME_Web 찾기 (ID: 332:3373)
    const homeWeb = findNodeById(document, '332:3373');
    
    if (homeWeb) {
      console.log('======================================================================');
      console.log('📐 HOME_Web 섹션 분석:');
      console.log('======================================================================\n');
      
      console.log('프레임 정보:');
      console.log(`  이름: ${homeWeb.name}`);
      console.log(`  타입: ${homeWeb.type}`);
      
      if (homeWeb.absoluteBoundingBox) {
        console.log(`  크기: ${homeWeb.absoluteBoundingBox.width}px × ${homeWeb.absoluteBoundingBox.height}px`);
      }
      
      if (homeWeb.children) {
        console.log('\n하위 섹션들:');
        homeWeb.children.forEach((child, index) => {
          console.log(`\n${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
          
          if (child.absoluteBoundingBox) {
            console.log(`   크기: ${child.absoluteBoundingBox.width}px × ${child.absoluteBoundingBox.height}px`);
          }
          
          if (child.backgroundColor) {
            const bg = child.backgroundColor;
            const r = Math.round(bg.r * 255);
            const g = Math.round(bg.g * 255);
            const b = Math.round(bg.b * 255);
            console.log(`   배경색: rgba(${r}, ${g}, ${b}, ${bg.a})`);
            console.log(`   배경색 HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
          
          // 첫 레벨 하위 요소만 표시
          if (child.children && child.children.length > 0) {
            console.log(`   하위 요소 ${child.children.length}개:`);
            child.children.slice(0, 5).forEach((subChild, subIndex) => {
              console.log(`     ${subIndex + 1}. ${subChild.name} (${subChild.type})`);
            });
            if (child.children.length > 5) {
              console.log(`     ... 외 ${child.children.length - 5}개`);
            }
          }
        });
      }
      
      // JSON 저장
      fs.writeFileSync('home-web-structure.json', JSON.stringify(homeWeb, null, 2));
      console.log('\n✅ home-web-structure.json에 저장되었습니다.');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkHOME_Web();
