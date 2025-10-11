const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getDesignerCardsData() {
  try {
    console.log('디자이너 카드 데이터 추출 중...\n');
    
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
    
    // Frame 2269 (디자이너 카드들) 찾기
    const designerCards = findNodeById(document, '332:2987');
    
    if (designerCards && designerCards.children) {
      console.log('======================================================================');
      console.log('디자이너 카드 데이터:');
      console.log('======================================================================\n');
      
      const cardsData = [];
      
      designerCards.children.forEach((card, index) => {
        console.log(`카드 ${index + 1}: ${card.name}`);
        
        const cardData = {
          id: index + 1,
          designer: '',
          category: '',
          imageSrc: ''
        };
        
        if (card.children) {
          card.children.forEach(child => {
            // designer_image 찾기
            if (child.name && child.name.includes('designer_image')) {
              console.log(`  이미지: ${child.name}`);
              
              if (child.fills) {
                const imageFill = child.fills.find(f => f.type === 'IMAGE');
                if (imageFill) {
                  cardData.imageSrc = imageFill.imageRef;
                  console.log(`    imageRef: ${imageFill.imageRef}`);
                }
              }
            }
            
            // Frame 2266 (텍스트들) 찾기
            if (child.name === 'Frame 2266' && child.children) {
              child.children.forEach(textNode => {
                if (textNode.type === 'TEXT') {
                  console.log(`  텍스트: "${textNode.characters}"`);
                  
                  if (textNode.characters.includes('#')) {
                    cardData.category = textNode.characters;
                  } else {
                    cardData.designer = textNode.characters;
                  }
                  
                  if (textNode.style) {
                    console.log(`    폰트: ${textNode.style.fontSize}px, weight ${textNode.style.fontWeight}`);
                  }
                }
              });
            }
          });
        }
        
        cardsData.push(cardData);
        console.log('');
      });
      
      // 이미지 URL 가져오기
      console.log('======================================================================');
      console.log('디자이너 이미지 URL 가져오는 중...');
      console.log('======================================================================\n');
      
      const imageIds = ['332:2989', '332:2994', '332:2999', '332:3004', '332:3009'];
      
      const imageResponse = await axios.get(
        `https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}?ids=${imageIds.join(',')}&format=png&scale=2`,
        {
          headers: {
            'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
          },
        }
      );
      
      if (imageResponse.data.images) {
        imageIds.forEach((id, index) => {
          console.log(`카드 ${index + 1} 이미지: ${imageResponse.data.images[id]}`);
          cardsData[index].imageUrl = imageResponse.data.images[id];
        });
      }
      
      console.log('\n======================================================================');
      console.log('최종 데이터:');
      console.log('======================================================================\n');
      
      cardsData.forEach(card => {
        console.log(`카드 ${card.id}:`);
        console.log(`  디자이너: ${card.designer}`);
        console.log(`  카테고리: ${card.category}`);
        console.log(`  이미지 URL: ${card.imageUrl}`);
        console.log('');
      });
      
      const fs = require('fs');
      fs.writeFileSync('designer-cards-data.json', JSON.stringify(cardsData, null, 2));
      console.log('✅ designer-cards-data.json에 저장되었습니다.');
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

getDesignerCardsData();
