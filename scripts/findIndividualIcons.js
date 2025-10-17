const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getFigmaData() {
  const response = await axios.get(`https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}`, {
    headers: {
      'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
    },
  });
  return response.data;
}

async function findIndividualIcons() {
  try {
    console.log('개별 아이콘들을 찾는 중...\n');
    
    const figmaData = await getFigmaData();
    const document = figmaData.document;
    
    function findNodesWithName(node, namePattern) {
      let results = [];
      
      if (node.name && node.name.match(namePattern)) {
        results.push({
          id: node.id,
          name: node.name,
          type: node.type
        });
      }
      
      if (node.children) {
        node.children.forEach(child => {
          results = results.concat(findNodesWithName(child, namePattern));
        });
      }
      
      return results;
    }
    
    // 아이콘 관련 키워드들로 검색
    const iconKeywords = [
      /icon/i,
      /heart/i,
      /like/i,
      /bookmark/i,
      /save/i,
      /share/i,
      /comment/i,
      /message/i,
      /star/i,
      /favorite/i
    ];
    
    console.log('======================================================================');
    console.log('개별 아이콘 검색 결과:');
    console.log('======================================================================\n');
    
    iconKeywords.forEach(keyword => {
      const matches = findNodesWithName(document, keyword);
      if (matches.length > 0) {
        console.log(`🔍 "${keyword.source}" 패턴 매치:`);
        matches.forEach(match => {
          console.log(`  - ID: ${match.id}`);
          console.log(`    이름: ${match.name}`);
          console.log(`    타입: ${match.type}`);
          console.log('');
        });
      }
    });
    
    // Main_bilder 프레임 내부의 모든 자식 요소들 확인
    console.log('======================================================================');
    console.log('Main_bilder 프레임 내부 구조 분석:');
    console.log('======================================================================\n');
    
    function analyzeMainBilder(node) {
      if (node.name && node.name.includes('Main_bilder')) {
        console.log(`📁 Main_bilder 프레임 발견: ${node.id}`);
        
        if (node.children) {
          node.children.forEach((child, index) => {
            console.log(`  ${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
            
            if (child.children) {
              child.children.forEach((grandChild, gIndex) => {
                console.log(`     ${gIndex + 1}. ${grandChild.name} (${grandChild.type}) - ID: ${grandChild.id}`);
                
                if (grandChild.children) {
                  grandChild.children.forEach((greatGrandChild, ggIndex) => {
                    console.log(`        ${ggIndex + 1}. ${greatGrandChild.name} (${greatGrandChild.type}) - ID: ${greatGrandChild.id}`);
                  });
                }
              });
            }
          });
        }
        return true;
      }
      
      if (node.children) {
        for (let child of node.children) {
          if (analyzeMainBilder(child)) {
            return true;
          }
        }
      }
      
      return false;
    }
    
    analyzeMainBilder(document);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

findIndividualIcons();
