const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkUploadButtonColor() {
  try {
    console.log('내 작업 업로드 버튼 색상 체크 중...\n');
    
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
    
    // Button_Upload 찾기 (ID: I136:7554;1:628)
    const uploadButton = findNodeById(document, 'I136:7554;1:628');
    
    if (uploadButton) {
      console.log('======================================================================');
      console.log('📐 Button_Upload (내 작업 업로드) - Figma 디자인:');
      console.log('======================================================================\n');
      
      console.log('버튼 정보:');
      console.log(`  이름: ${uploadButton.name}`);
      console.log(`  타입: ${uploadButton.type}`);
      
      if (uploadButton.fills && uploadButton.fills.length > 0) {
        console.log('\n배경색:');
        uploadButton.fills.forEach((fill, index) => {
          console.log(`  Fill ${index + 1}:`);
          console.log(`    타입: ${fill.type}`);
          
          if (fill.color) {
            const color = fill.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
        });
      }
      
      // 텍스트 색상 찾기
      const buttonText = findNodeById(uploadButton, 'I136:7554;1:629');
      
      if (buttonText && buttonText.fills) {
        console.log('\n텍스트 색상:');
        buttonText.fills.forEach((fill, index) => {
          if (fill.color) {
            const color = fill.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`  rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`  HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
        });
      }
    }
    
    // Button_Hire (디자인 의뢰하기) 색상도 체크
    const hireButton = findNodeById(document, 'I136:7554;1:630');
    
    if (hireButton) {
      console.log('\n\n======================================================================');
      console.log('📐 Button_Hire (디자인 의뢰하기) - Figma 디자인:');
      console.log('======================================================================\n');
      
      if (hireButton.fills && hireButton.fills.length > 0) {
        console.log('배경색:');
        hireButton.fills.forEach((fill, index) => {
          console.log(`  Fill ${index + 1}:`);
          console.log(`    타입: ${fill.type}`);
          
          if (fill.color) {
            const color = fill.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
        });
      }
    }
    
    console.log('\n\n======================================================================');
    console.log('💡 현재 CSS:');
    console.log('======================================================================\n');
    console.log('.requestDesignButton: background-color: #333333');
    console.log('.myWorkButton: background-color: #4b00ff');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkUploadButtonColor();
