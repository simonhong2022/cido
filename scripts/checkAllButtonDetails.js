const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkAllButtonDetails() {
  try {
    console.log('모든 버튼 디테일 체크 중...\n');
    
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
    
    console.log('======================================================================');
    console.log('📐 디자인 의뢰하기 버튼 (Button_Hire):');
    console.log('======================================================================\n');
    
    const hireButton = findNodeById(document, 'I136:7554;1:630');
    
    if (hireButton) {
      console.log('버튼 프레임:');
      console.log(`  이름: ${hireButton.name}`);
      
      if (hireButton.fills) {
        console.log('\n버튼 배경:');
        hireButton.fills.forEach((fill, index) => {
          if (fill.type === 'SOLID' && fill.color) {
            const color = fill.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`  Fill ${index + 1}:`);
            console.log(`    타입: ${fill.type}`);
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
            console.log(`    visible: ${fill.visible !== false ? 'true' : 'false'}`);
          }
        });
      }
      
      if (hireButton.strokes && hireButton.strokes.length > 0) {
        console.log('\n버튼 테두리:');
        hireButton.strokes.forEach((stroke, index) => {
          if (stroke.color) {
            const color = stroke.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`  Stroke ${index + 1}:`);
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
        });
        console.log(`  strokeWeight: ${hireButton.strokeWeight}`);
      }
      
      // 텍스트 찾기
      const hireText = findNodeById(hireButton, 'I136:7554;1:631');
      
      if (hireText && hireText.fills) {
        console.log('\n텍스트 색상:');
        hireText.fills.forEach((fill, index) => {
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
    
    console.log('\n\n======================================================================');
    console.log('📐 내 작업 업로드 버튼 (Button_Upload):');
    console.log('======================================================================\n');
    
    const uploadButton = findNodeById(document, 'I136:7554;1:628');
    
    if (uploadButton) {
      if (uploadButton.fills) {
        console.log('버튼 배경:');
        uploadButton.fills.forEach((fill, index) => {
          if (fill.type === 'SOLID' && fill.color) {
            const color = fill.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`  Fill ${index + 1}:`);
            console.log(`    타입: ${fill.type}`);
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
            console.log(`    visible: ${fill.visible !== false ? 'true' : 'false'}`);
          }
        });
      }
      
      if (uploadButton.strokes && uploadButton.strokes.length > 0) {
        console.log('\n버튼 테두리:');
        uploadButton.strokes.forEach((stroke, index) => {
          if (stroke.color) {
            const color = stroke.color;
            const r = Math.round(color.r * 255);
            const g = Math.round(color.g * 255);
            const b = Math.round(color.b * 255);
            
            console.log(`  Stroke ${index + 1}:`);
            console.log(`    rgba: rgba(${r}, ${g}, ${b}, ${color.a})`);
            console.log(`    HEX: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
          }
        });
        console.log(`  strokeWeight: ${uploadButton.strokeWeight}`);
      }
    }
    
    console.log('\n\n======================================================================');
    console.log('💡 수정 필요:');
    console.log('======================================================================\n');
    console.log('현재 CSS:');
    console.log('  .requestDesignButton: #333333 (회색)');
    console.log('  .myWorkButton: #4b00ff (보라색)');
    console.log('\nFigma 디자인:');
    console.log('  .requestDesignButton: #ffffff (흰색)');
    console.log('  .myWorkButton: #1918f8 (파란색)');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkAllButtonDetails();
