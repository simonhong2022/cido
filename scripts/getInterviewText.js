const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getInterviewText() {
  try {
    console.log('Interview 섹션 텍스트 추출 중...\n');
    
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
    
    // Interview 프레임 찾기
    const interviewFrame = findNodeById(document, '143:8085');
    
    if (interviewFrame) {
      console.log('======================================================================');
      console.log('Interview 섹션 텍스트:');
      console.log('======================================================================\n');
      
      function findTextNodes(node) {
        let texts = [];
        
        if (node.type === 'TEXT' && node.characters) {
          texts.push({
            text: node.characters,
            fontSize: node.style?.fontSize,
            fontWeight: node.style?.fontWeight,
            fontFamily: node.style?.fontFamily,
            color: node.fills && node.fills[0] && node.fills[0].color ? 
              `#${Math.round(node.fills[0].color.r * 255).toString(16).padStart(2, '0')}${Math.round(node.fills[0].color.g * 255).toString(16).padStart(2, '0')}${Math.round(node.fills[0].color.b * 255).toString(16).padStart(2, '0')}` : null
          });
        }
        
        if (node.children) {
          node.children.forEach(child => {
            texts = texts.concat(findTextNodes(child));
          });
        }
        
        return texts;
      }
      
      const texts = findTextNodes(interviewFrame);
      
      texts.forEach((text, index) => {
        console.log(`텍스트 ${index + 1}: "${text.text}"`);
        console.log(`  폰트: ${text.fontFamily} ${text.fontSize}px, weight ${text.fontWeight}`);
        console.log(`  색상: ${text.color}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

getInterviewText();
