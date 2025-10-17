const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkFrame1261154926Complete() {
  try {
    console.log('Frame 1261154926 완전 체크 중...\n');
    
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
    
    const frame = findNodeById(document, '332:3013');
    
    if (frame) {
      console.log('======================================================================');
      console.log('📐 Frame 1261154926 (Hot Designer) 완전 분석:');
      console.log('======================================================================\n');
      
      console.log('프레임 크기:', frame.absoluteBoundingBox?.width, 'x', frame.absoluteBoundingBox?.height);
      
      if (frame.children) {
        console.log('\n하위 섹션들:\n');
        
        frame.children.forEach((child, index) => {
          console.log(`${index + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
          
          if (child.absoluteBoundingBox) {
            console.log(`   크기: ${child.absoluteBoundingBox.width}px × ${child.absoluteBoundingBox.height}px`);
            
            // 프레임 기준 위치
            const relY = child.absoluteBoundingBox.y - frame.absoluteBoundingBox.y;
            console.log(`   프레임 내 위치: top=${relY}px`);
          }
          
          // Interview 프레임 상세
          if (child.name === 'Interview' && child.id === '136:7718') {
            console.log('\n   📋 Interview 프레임 상세:');
            
            // Frame 1261154907 (배경)
            const bgFrame = findNodeById(child, '136:7719');
            if (bgFrame && bgFrame.absoluteBoundingBox) {
              console.log(`      Frame 1261154907 (배경): ${bgFrame.absoluteBoundingBox.width}px × ${bgFrame.absoluteBoundingBox.height}px`);
              
              // 배경 이미지 참조
              if (bgFrame.fills) {
                const imageFill = bgFrame.fills.find(f => f.type === 'IMAGE');
                if (imageFill) {
                  console.log(`      배경 이미지: ${imageFill.imageRef}`);
                }
              }
            }
            
            // Frame 1261154906 (콘텐츠)
            const contentFrame = findNodeById(child, '136:7720');
            if (contentFrame && contentFrame.absoluteBoundingBox) {
              const contentRelY = contentFrame.absoluteBoundingBox.y - bgFrame.absoluteBoundingBox.y;
              const contentFromBottom = bgFrame.absoluteBoundingBox.height - (contentRelY + contentFrame.absoluteBoundingBox.height);
              
              console.log(`      Frame 1261154906 (콘텐츠):`);
              console.log(`        크기: ${contentFrame.absoluteBoundingBox.width}px × ${contentFrame.absoluteBoundingBox.height}px`);
              console.log(`        배경 기준 위치: top=${contentRelY}px, bottom=${contentFromBottom}px`);
              
              // Frame 1261154889 (텍스트 영역)
              const textFrame = findNodeById(contentFrame, '136:7721');
              if (textFrame && textFrame.absoluteBoundingBox) {
                const textRelX = textFrame.absoluteBoundingBox.x - bgFrame.absoluteBoundingBox.x;
                const textRelY = textFrame.absoluteBoundingBox.y - bgFrame.absoluteBoundingBox.y;
                const textFromBottom = bgFrame.absoluteBoundingBox.height - (textRelY + textFrame.absoluteBoundingBox.height);
                
                console.log(`      Frame 1261154889 (텍스트):`);
                console.log(`        배경 기준: left=${textRelX}px, top=${textRelY}px, bottom=${textFromBottom}px`);
              }
              
              // Button 프레임
              const buttonFrame = findNodeById(contentFrame, '143:8084');
              if (buttonFrame && buttonFrame.absoluteBoundingBox) {
                const btnRelX = buttonFrame.absoluteBoundingBox.x - bgFrame.absoluteBoundingBox.x;
                const btnRelY = buttonFrame.absoluteBoundingBox.y - bgFrame.absoluteBoundingBox.y;
                const btnFromRight = bgFrame.absoluteBoundingBox.width - (btnRelX + buttonFrame.absoluteBoundingBox.width);
                const btnFromBottom = bgFrame.absoluteBoundingBox.height - (btnRelY + buttonFrame.absoluteBoundingBox.height);
                
                console.log(`      Button 프레임:`);
                console.log(`        배경 기준: right=${btnFromRight}px, bottom=${btnFromBottom}px`);
              }
            }
          }
          
          // Frame 2269 (디자이너 카드들) 상세
          if (child.name === 'Frame 2269' && child.id === '332:2987') {
            console.log('\n   📋 Frame 2269 (디자이너 카드들) 상세:');
            
            if (child.absoluteBoundingBox) {
              console.log(`      크기: ${child.absoluteBoundingBox.width}px × ${child.absoluteBoundingBox.height}px`);
              
              const relY = child.absoluteBoundingBox.y - frame.absoluteBoundingBox.y;
              const fromTop = relY;
              const fromBottom = frame.absoluteBoundingBox.height - (relY + child.absoluteBoundingBox.height);
              
              console.log(`      위치: top=${fromTop}px, bottom=${fromBottom}px`);
            }
            
            if (child.children) {
              console.log(`      디자이너 카드 개수: ${child.children.length}개`);
              
              // 첫 카드와 마지막 카드 위치
              if (child.children.length > 0) {
                const firstCard = child.children[0];
                const lastCard = child.children[child.children.length - 1];
                
                if (firstCard.absoluteBoundingBox && lastCard.absoluteBoundingBox) {
                  const gap = lastCard.absoluteBoundingBox.x - (firstCard.absoluteBoundingBox.x + firstCard.absoluteBoundingBox.width);
                  console.log(`      카드 간격: ${gap}px`);
                }
              }
            }
          }
          
          console.log('');
        });
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkFrame1261154926Complete();
