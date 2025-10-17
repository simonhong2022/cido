const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getBackgroundOnly() {
  try {
    console.log('배경 이미지만 추출하는 중...\n');
    
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
    
    // Frame 1261154907 찾기 (배경 프레임)
    const bgFrame = findNodeById(document, '136:7719');
    
    if (bgFrame && bgFrame.fills) {
      console.log('======================================================================');
      console.log('Frame 1261154907 배경 정보:');
      console.log('======================================================================\n');
      
      // IMAGE 타입의 fill 찾기
      const imageFill = bgFrame.fills.find(fill => fill.type === 'IMAGE');
      
      if (imageFill && imageFill.imageRef) {
        console.log('✅ 배경 이미지 참조 찾음:', imageFill.imageRef);
        
        // 이미지 참조로 URL 가져오기
        const imageUrl = `https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}?ids=136:7719&format=png&scale=2`;
        
        const imageResponse = await axios.get(imageUrl, {
          headers: {
            'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
          },
        });
        
        if (imageResponse.data.images && imageResponse.data.images['136:7719']) {
          console.log('\n배경 이미지 URL:');
          console.log(imageResponse.data.images['136:7719']);
          
          console.log('\n⚠️  주의: 이 이미지에는 여전히 텍스트가 포함되어 있습니다.');
          console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('💡 더 나은 해결책:');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('\n1. CSS 배경색 + 그라데이션 사용:');
          console.log('   - Figma의 배경 fill 정보를 CSS로 재현');
          console.log('   - 텍스트는 React 컴포넌트로 작성');
          console.log('   - 이미지는 사용하지 않음');
          console.log('\n2. 배경 이미지만 별도 레이어로 분리:');
          console.log('   - Figma에서 배경 이미지를 별도 RECTANGLE으로 분리');
          console.log('   - 텍스트 레이어와 독립적으로 관리');
          console.log('\n3. Figma 컴포넌트 구조 개선:');
          console.log('   - 배경용 컴포넌트와 콘텐츠용 컴포넌트 분리');
          console.log('   - API에서 각각 독립적으로 가져오기');
        }
      }
      
      console.log('\n======================================================================');
      console.log('Frame 1261154907의 모든 fill 정보:');
      console.log('======================================================================\n');
      
      bgFrame.fills.forEach((fill, index) => {
        console.log(`Fill ${index + 1}:`);
        console.log(`  타입: ${fill.type}`);
        
        if (fill.type === 'SOLID') {
          const color = fill.color;
          console.log(`  색상: rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`);
          console.log(`  HEX: #${Math.round(color.r * 255).toString(16).padStart(2, '0')}${Math.round(color.g * 255).toString(16).padStart(2, '0')}${Math.round(color.b * 255).toString(16).padStart(2, '0')}`);
        }
        
        if (fill.type === 'IMAGE') {
          console.log(`  이미지 참조: ${fill.imageRef}`);
          console.log(`  불투명도: ${fill.opacity || 1}`);
          if (fill.scaleMode) {
            console.log(`  스케일 모드: ${fill.scaleMode}`);
          }
        }
        
        if (fill.type === 'GRADIENT_LINEAR') {
          console.log(`  그라데이션:`);
          if (fill.gradientStops) {
            fill.gradientStops.forEach((stop, stopIndex) => {
              const color = stop.color;
              console.log(`    Stop ${stopIndex + 1} (position: ${stop.position}):`);
              console.log(`      rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`);
            });
          }
        }
        
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

getBackgroundOnly();
