/**
 * All Icons 데이터 추출
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getAllIconsData() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function findNodeById(node, targetId) {
      if (node.id === targetId) return node;
      if (node.children) {
        for (let child of node.children) {
          const found = findNodeById(child, targetId);
          if (found) return found;
        }
      }
      return null;
    }
    
    function analyzeAllIcons(allIconsFrame) {
      console.log(`All Icons 분석: ${allIconsFrame.name} - ID: ${allIconsFrame.id}`);
      
      if (allIconsFrame.absoluteBoundingBox) {
        const { x, y, width, height } = allIconsFrame.absoluteBoundingBox;
        console.log(`  위치: x:${Math.round(x)}, y:${Math.round(y)}, 크기: ${Math.round(width)}x${Math.round(height)}`);
      }
      
      if (allIconsFrame.children && allIconsFrame.children.length > 0) {
        console.log(`  아이콘 개수: ${allIconsFrame.children.length}`);
        allIconsFrame.children.forEach((icon, idx) => {
          console.log(`    ${idx + 1}. ${icon.name} (${icon.type}) - ID: ${icon.id}`);
          
          if (icon.absoluteBoundingBox) {
            const { x, y, width, height } = icon.absoluteBoundingBox;
            console.log(`       위치: x:${Math.round(x)}, y:${Math.round(y)}, 크기: ${Math.round(width)}x${Math.round(height)}`);
          }
          
          if (icon.type === 'VECTOR') {
            console.log(`       벡터 아이콘`);
          }
          
          if (icon.fills && icon.fills.length > 0) {
            icon.fills.forEach(fill => {
              if (fill.type === 'SOLID') {
                const color = fill.color;
                console.log(`       색상: rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`);
              }
            });
          }
        });
      }
      console.log('');
    }
    
    // 각 카드의 All Icons 프레임들 분석
    const allIconsIds = [
      '136:7368', // 카드 1의 첫 번째 All Icons
      '136:7374', // 카드 1의 두 번째 All Icons
      '136:7605', // 카드 2의 첫 번째 All Icons
      '136:7611', // 카드 2의 두 번째 All Icons
      '136:7665', // 카드 3의 첫 번째 All Icons
      '136:7671', // 카드 3의 두 번째 All Icons
      '136:7683', // 카드 4의 첫 번째 All Icons
      '136:7689', // 카드 4의 두 번째 All Icons
      '136:7701', // 카드 5의 첫 번째 All Icons
      '136:7707', // 카드 5의 두 번째 All Icons
    ];
    
    console.log('All Icons 프레임들 분석:\n');
    console.log('='.repeat(70));
    
    const allIconsData = [];
    
    allIconsIds.forEach((id, idx) => {
      const allIconsFrame = findNodeById(data.document, id);
      if (allIconsFrame) {
        analyzeAllIcons(allIconsFrame);
        allIconsData.push({
          id: allIconsFrame.id,
          name: allIconsFrame.name,
          cardIndex: Math.floor(idx / 2) + 1,
          iconGroup: (idx % 2) + 1,
          children: allIconsFrame.children || []
        });
      }
    });
    
    // JSON으로 저장
    fs.writeFileSync('./all-icons-data.json', JSON.stringify(allIconsData, null, 2));
    console.log('✅ all-icons-data.json에 저장되었습니다.');
    
    return allIconsData;
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getAllIconsData();
