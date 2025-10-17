const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkNavigation() {
  try {
    console.log('HOME/Navigation_Logout_Web 체크 중...\n');
    
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
    
    // HOME/Navigation_Logout_Web 찾기 (ID: 136:7554)
    const navFrame = findNodeById(document, '136:7554');
    
    if (navFrame) {
      console.log('======================================================================');
      console.log('📐 HOME/Navigation_Logout_Web - Figma 디자인:');
      console.log('======================================================================\n');
      
      console.log('프레임 정보:');
      console.log(`  이름: ${navFrame.name}`);
      console.log(`  타입: ${navFrame.type}`);
      console.log(`  ID: ${navFrame.id}`);
      
      if (navFrame.absoluteBoundingBox) {
        console.log(`\n크기 및 위치:`);
        console.log(`  너비: ${navFrame.absoluteBoundingBox.width}px`);
        console.log(`  높이: ${navFrame.absoluteBoundingBox.height}px`);
        console.log(`  X: ${navFrame.absoluteBoundingBox.x}`);
        console.log(`  Y: ${navFrame.absoluteBoundingBox.y}`);
      }
      
      if (navFrame.backgroundColor) {
        const bg = navFrame.backgroundColor;
        console.log(`\n배경색:`);
        console.log(`  rgba(${Math.round(bg.r * 255)}, ${Math.round(bg.g * 255)}, ${Math.round(bg.b * 255)}, ${bg.a})`);
        console.log(`  HEX: #${Math.round(bg.r * 255).toString(16).padStart(2, '0')}${Math.round(bg.g * 255).toString(16).padStart(2, '0')}${Math.round(bg.b * 255).toString(16).padStart(2, '0')}`);
      }
      
      console.log('\n\n하위 요소들:');
      
      function analyzeChildren(children, indent = '') {
        children.forEach((child, index) => {
          console.log(`${indent}${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
          
          if (child.absoluteBoundingBox) {
            console.log(`${indent}   위치: X=${child.absoluteBoundingBox.x}, Y=${child.absoluteBoundingBox.y}`);
            console.log(`${indent}   크기: ${child.absoluteBoundingBox.width}px × ${child.absoluteBoundingBox.height}px`);
          }
          
          if (child.type === 'TEXT') {
            console.log(`${indent}   텍스트: "${child.characters}"`);
            if (child.style) {
              console.log(`${indent}   폰트: ${child.style.fontFamily} ${child.style.fontSize}px, weight ${child.style.fontWeight}`);
              if (child.fills && child.fills[0] && child.fills[0].color) {
                const color = child.fills[0].color;
                console.log(`${indent}   색상: #${Math.round(color.r * 255).toString(16).padStart(2, '0')}${Math.round(color.g * 255).toString(16).padStart(2, '0')}${Math.round(color.b * 255).toString(16).padStart(2, '0')}`);
              }
            }
          }
          
          if (child.children && child.children.length > 0 && indent.length < 12) {
            analyzeChildren(child.children, indent + '   ');
          }
        });
      }
      
      if (navFrame.children) {
        analyzeChildren(navFrame.children);
      }
      
      console.log('\n\n======================================================================');
      console.log('💡 현재 구현 확인 필요:');
      console.log('======================================================================\n');
      console.log('1. NavigationBar 컴포넌트 확인');
      console.log('2. 높이가 Figma와 일치하는지');
      console.log('3. 배경색이 일치하는지');
      console.log('4. 로고, 메뉴, 버튼 위치가 정확한지');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkNavigation();
