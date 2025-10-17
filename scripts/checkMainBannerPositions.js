const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function checkMainBannerPositions() {
  try {
    console.log('Main_Banner 위치 및 패딩 계산 중...\n');
    
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
    
    const mainBanner = findNodeById(document, '136:7598');
    
    if (mainBanner && mainBanner.absoluteBoundingBox) {
      console.log('======================================================================');
      console.log('Main_Banner 위치 계산:');
      console.log('======================================================================\n');
      
      const frameX = mainBanner.absoluteBoundingBox.x;
      const frameY = mainBanner.absoluteBoundingBox.y;
      const frameWidth = mainBanner.absoluteBoundingBox.width;
      const frameHeight = mainBanner.absoluteBoundingBox.height;
      
      console.log('프레임 크기:', frameWidth, 'x', frameHeight);
      
      // Paragraph_Container 위치
      const paragraphContainer = findNodeById(mainBanner, '136:7597');
      
      if (paragraphContainer && paragraphContainer.absoluteBoundingBox) {
        const relX = paragraphContainer.absoluteBoundingBox.x - frameX;
        const relY = paragraphContainer.absoluteBoundingBox.y - frameY;
        const fromBottom = frameHeight - (relY + paragraphContainer.absoluteBoundingBox.height);
        
        console.log('\nParagraph_Container (텍스트 + 버튼):');
        console.log(`  프레임 기준: left=${relX}px, top=${relY}px`);
        console.log(`  아래에서: ${fromBottom}px`);
        console.log(`  크기: ${paragraphContainer.absoluteBoundingBox.width}px × ${paragraphContainer.absoluteBoundingBox.height}px`);
        
        // Title 위치
        const titleFrame = findNodeById(mainBanner, '136:7452');
        
        if (titleFrame && titleFrame.absoluteBoundingBox) {
          const titleRelX = titleFrame.absoluteBoundingBox.x - frameX;
          const titleRelY = titleFrame.absoluteBoundingBox.y - frameY;
          const titleFromBottom = frameHeight - (titleRelY + titleFrame.absoluteBoundingBox.height);
          
          console.log('\nTitle (Hot Project + 지금 핫한...):');
          console.log(`  프레임 기준: left=${titleRelX}px, top=${titleRelY}px`);
          console.log(`  아래에서: ${titleFromBottom}px`);
        }
        
        // Button 위치
        const buttonFrame = findNodeById(mainBanner, '136:7455');
        
        if (buttonFrame && buttonFrame.absoluteBoundingBox) {
          const btnRelX = buttonFrame.absoluteBoundingBox.x - frameX;
          const btnRelY = buttonFrame.absoluteBoundingBox.y - frameY;
          const btnFromBottom = frameHeight - (btnRelY + buttonFrame.absoluteBoundingBox.height);
          const btnFromRight = frameWidth - (btnRelX + buttonFrame.absoluteBoundingBox.width);
          
          console.log('\nButton 프레임:');
          console.log(`  프레임 기준: left=${btnRelX}px, top=${btnRelY}px`);
          console.log(`  아래에서: ${btnFromBottom}px`);
          console.log(`  오른쪽에서: ${btnFromRight}px`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

checkMainBannerPositions();
