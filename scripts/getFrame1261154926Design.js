const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function getFrame1261154926Design() {
  try {
    console.log('Frame 1261154926 디자인 정보 추출 중...\n');
    
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
    
    // Interview 프레임 찾기 (ID: 136:7718)
    const interviewFrame = findNodeById(document, '136:7718');
    
    if (interviewFrame) {
      console.log('======================================================================');
      console.log('Interview (Hot Designer) 프레임 정보:');
      console.log('======================================================================\n');
      
      // Frame 1261154907 찾기 (배경 이미지가 있는 프레임)
      const bgFrame = findNodeById(interviewFrame, '136:7719');
      
      if (bgFrame) {
        console.log('배경 프레임 (Frame 1261154907):');
        console.log('  ID:', bgFrame.id);
        console.log('  크기:', bgFrame.absoluteBoundingBox?.width, 'x', bgFrame.absoluteBoundingBox?.height);
        
        if (bgFrame.fills && bgFrame.fills.length > 0) {
          console.log('\n  배경 정보:');
          bgFrame.fills.forEach((fill, index) => {
            console.log(`    ${index + 1}. 타입:`, fill.type);
            if (fill.color) {
              console.log(`       색상: rgba(${Math.round(fill.color.r * 255)}, ${Math.round(fill.color.g * 255)}, ${Math.round(fill.color.b * 255)}, ${fill.color.a})`);
            }
            if (fill.imageRef) {
              console.log(`       이미지 참조:`, fill.imageRef);
            }
          });
        }
      }
      
      // Frame 1261154906 안의 텍스트들 찾기
      const contentFrame = findNodeById(interviewFrame, '136:7720');
      
      if (contentFrame && contentFrame.children) {
        console.log('\n텍스트 요소들:');
        
        function findTextNodes(node, path = []) {
          if (node.type === 'TEXT') {
            console.log(`\n  "${node.characters}"`);
            console.log(`    ID: ${node.id}`);
            console.log(`    경로: ${path.join(' > ')}`);
            
            if (node.style) {
              console.log(`    폰트 패밀리: ${node.style.fontFamily}`);
              console.log(`    폰트 크기: ${node.style.fontSize}px`);
              console.log(`    폰트 두께: ${node.style.fontWeight}`);
              
              if (node.fills && node.fills[0] && node.fills[0].color) {
                const color = node.fills[0].color;
                console.log(`    색상: rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`);
                console.log(`    색상 HEX: #${Math.round(color.r * 255).toString(16).padStart(2, '0')}${Math.round(color.g * 255).toString(16).padStart(2, '0')}${Math.round(color.b * 255).toString(16).padStart(2, '0')}`);
              }
            }
          }
          
          if (node.children) {
            node.children.forEach(child => {
              findTextNodes(child, [...path, node.name]);
            });
          }
        }
        
        findTextNodes(contentFrame);
      }
      
      // 버튼 텍스트 찾기
      const buttonFrame = findNodeById(interviewFrame, '143:8084');
      
      if (buttonFrame) {
        console.log('\n버튼 텍스트:');
        
        function findButtonTexts(node) {
          if (node.type === 'TEXT') {
            console.log(`\n  "${node.characters}"`);
            if (node.style) {
              console.log(`    폰트 크기: ${node.style.fontSize}px`);
              console.log(`    폰트 두께: ${node.style.fontWeight}`);
            }
          }
          
          if (node.children) {
            node.children.forEach(child => findButtonTexts(child));
          }
        }
        
        findButtonTexts(buttonFrame);
      }
      
      // 배경 이미지 URL 가져오기
      console.log('\n======================================================================');
      console.log('배경 이미지 URL 가져오는 중...');
      console.log('======================================================================\n');
      
      const imageResponse = await axios.get(
        `https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}?ids=136:7719&format=png&scale=2`,
        {
          headers: {
            'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
          },
        }
      );
      
      if (imageResponse.data.images) {
        console.log('배경 이미지 URL:', imageResponse.data.images['136:7719']);
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

getFrame1261154926Design();
