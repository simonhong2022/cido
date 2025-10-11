/**
 * Main_bilder의 배경 이미지 추출
 * 프레임이 아닌 실제 배경 이미지를 가져옵니다
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getBackgroundImages() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function findNode(node, name) {
      if (node.name === name) return node;
      if (node.children) {
        for (let child of node.children) {
          const found = findNode(child, name);
          if (found) return found;
        }
      }
      return null;
    }
    
    function findImageNodes(node, images = []) {
      // 이미지가 있는 노드 찾기
      if (node.type === 'RECTANGLE' && node.fills) {
        const imageFill = node.fills.find(fill => fill.type === 'IMAGE');
        if (imageFill) {
          images.push({
            id: node.id,
            name: node.name,
            imageRef: imageFill.imageRef,
            node: node
          });
        }
      }
      
      if (node.children) {
        node.children.forEach(child => findImageNodes(child, images));
      }
      return images;
    }
    
    const mainBilder = findNode(data.document, 'Main_bilder');
    if (!mainBilder || !mainBilder.children) {
      console.log('Main_bilder를 찾을 수 없습니다.');
      return;
    }
    
    console.log('Main_bilder 배경 이미지 찾는 중...\n');
    console.log('='.repeat(70));
    
    const allImages = [];
    
    mainBilder.children.forEach((card, idx) => {
      console.log(`\n카드 ${idx + 1}: ${card.name}`);
      console.log(`  Node ID: ${card.id}`);
      
      const cardImages = findImageNodes(card);
      console.log(`  배경 이미지 개수: ${cardImages.length}`);
      
      cardImages.forEach((img, imgIdx) => {
        console.log(`    이미지 ${imgIdx + 1}:`);
        console.log(`      - 이름: ${img.name}`);
        console.log(`      - ID: ${img.id}`);
        console.log(`      - ImageRef: ${img.imageRef}`);
        allImages.push({
          cardIndex: idx + 1,
          cardName: card.name,
          imageName: img.name,
          imageId: img.id,
          imageRef: img.imageRef
        });
      });
    });
    
    if (allImages.length === 0) {
      console.log('\n❌ 배경 이미지를 찾을 수 없습니다.');
      console.log('프레임 자체의 이미지를 사용해야 할 수도 있습니다.');
      return;
    }
    
    // 이미지 URL 가져오기
    console.log('\n\n' + '='.repeat(70));
    console.log('배경 이미지 URL 가져오는 중...\n');
    
    const imageIds = allImages.map(img => img.imageId);
    const response = await axios.get(
      `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`,
      {
        headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN },
        params: {
          ids: imageIds.join(','),
          format: 'png',
          scale: 2,
        }
      }
    );
    
    console.log('\n배경 이미지 데이터:\n');
    allImages.forEach((img, idx) => {
      const imageUrl = response.data.images[img.imageId];
      console.log(`카드 ${img.cardIndex}: ${img.cardName}`);
      console.log(`  배경 이미지: ${img.imageName}`);
      console.log(`  URL: ${imageUrl}\n`);
    });
    
    // JSON으로 저장
    const result = allImages.map(img => ({
      cardIndex: img.cardIndex,
      cardName: img.cardName,
      imageName: img.imageName,
      imageId: img.imageId,
      imageUrl: response.data.images[img.imageId]
    }));
    
    fs.writeFileSync('./background-images.json', JSON.stringify(result, null, 2));
    console.log('✅ background-images.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getBackgroundImages();
