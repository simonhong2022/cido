const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function compareWithFigma() {
  try {
    console.log('Figma 디자인과 현재 구현 비교 중...\n');
    
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
    
    // Hot Designer 섹션 (Frame 1261154926) 분석
    const hotDesignerFrame = findNodeById(document, '332:3013');
    
    if (hotDesignerFrame) {
      console.log('======================================================================');
      console.log('📐 Frame 1261154926 (Hot Designer) - Figma 디자인 상세:');
      console.log('======================================================================\n');
      
      console.log('프레임 크기:');
      if (hotDesignerFrame.absoluteBoundingBox) {
        console.log(`  너비: ${hotDesignerFrame.absoluteBoundingBox.width}px`);
        console.log(`  높이: ${hotDesignerFrame.absoluteBoundingBox.height}px`);
      }
      
      // Interview 프레임 (136:7718) 찾기
      const interviewFrame = findNodeById(document, '136:7718');
      
      if (interviewFrame && interviewFrame.absoluteBoundingBox) {
        console.log('\nInterview 프레임 크기:');
        console.log(`  너비: ${interviewFrame.absoluteBoundingBox.width}px`);
        console.log(`  높이: ${interviewFrame.absoluteBoundingBox.height}px`);
      }
      
      // Frame 1261154907 (배경) 찾기
      const bgFrame = findNodeById(document, '136:7719');
      
      if (bgFrame && bgFrame.absoluteBoundingBox) {
        console.log('\nFrame 1261154907 (배경) 크기:');
        console.log(`  너비: ${bgFrame.absoluteBoundingBox.width}px`);
        console.log(`  높이: ${bgFrame.absoluteBoundingBox.height}px`);
        console.log(`  X: ${bgFrame.absoluteBoundingBox.x}`);
        console.log(`  Y: ${bgFrame.absoluteBoundingBox.y}`);
      }
      
      // Frame 1261154906 (콘텐츠) 위치 찾기
      const contentFrame = findNodeById(document, '136:7720');
      
      if (contentFrame && contentFrame.absoluteBoundingBox) {
        console.log('\nFrame 1261154906 (콘텐츠) 위치:');
        console.log(`  X: ${contentFrame.absoluteBoundingBox.x}`);
        console.log(`  Y: ${contentFrame.absoluteBoundingBox.y}`);
        console.log(`  너비: ${contentFrame.absoluteBoundingBox.width}px`);
        console.log(`  높이: ${contentFrame.absoluteBoundingBox.height}px`);
      }
      
      // Frame 1261154889 (텍스트 영역) 찾기
      const textFrame = findNodeById(document, '136:7721');
      
      if (textFrame && textFrame.absoluteBoundingBox) {
        console.log('\nFrame 1261154889 (텍스트 영역) 위치:');
        console.log(`  X: ${textFrame.absoluteBoundingBox.x}`);
        console.log(`  Y: ${textFrame.absoluteBoundingBox.y}`);
        console.log(`  너비: ${textFrame.absoluteBoundingBox.width}px`);
        console.log(`  높이: ${textFrame.absoluteBoundingBox.height}px`);
        
        if (textFrame.children) {
          console.log('\n  텍스트 요소들:');
          textFrame.children.forEach(child => {
            if (child.type === 'TEXT' && child.absoluteBoundingBox) {
              console.log(`\n    "${child.characters}"`);
              console.log(`      X: ${child.absoluteBoundingBox.x}`);
              console.log(`      Y: ${child.absoluteBoundingBox.y}`);
              console.log(`      폰트 크기: ${child.style?.fontSize}px`);
              console.log(`      폰트 두께: ${child.style?.fontWeight}`);
            }
          });
        }
      }
      
      // 버튼 위치 찾기
      const buttonFrame = findNodeById(document, '143:8084');
      
      if (buttonFrame && buttonFrame.absoluteBoundingBox) {
        console.log('\n\nButton 프레임 위치:');
        console.log(`  X: ${buttonFrame.absoluteBoundingBox.x}`);
        console.log(`  Y: ${buttonFrame.absoluteBoundingBox.y}`);
        console.log(`  너비: ${buttonFrame.absoluteBoundingBox.width}px`);
        console.log(`  높이: ${buttonFrame.absoluteBoundingBox.height}px`);
      }
      
      console.log('\n\n======================================================================');
      console.log('현재 구현과 비교:');
      console.log('======================================================================\n');
      
      console.log('현재 CSS:');
      console.log('  width: 1920px');
      console.log('  height: 716px');
      console.log('  padding: 48px');
      console.log('  display: flex');
      console.log('  flex-direction: column');
      console.log('  justify-content: flex-start');
      console.log('\nFigma와 다른 점을 확인하세요!');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

compareWithFigma();
