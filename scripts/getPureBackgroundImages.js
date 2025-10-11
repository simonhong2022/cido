/**
 * Frame 1261154908에서 순수한 배경 이미지만 추출
 * 아이콘이 포함되지 않은 깔끔한 배경 이미지를 가져옵니다
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getPureBackgroundImages() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function findNodeById(node, targetId) {
      if (node.id === targetId) return node;
      if (node.children) {
        for (let child of node.children) {
          const found = findNodeById(child, targetId);
          if (found) return found;
        }
      }
      return null;
    }
    
    // Frame 1261154908들 (배경 이미지 프레임)
    const backgroundFrameIds = [
      '136:7600', // 카드 1의 배경 프레임
      '136:7603', // 카드 2의 배경 프레임  
      '136:7663', // 카드 3의 배경 프레임
      '136:7681', // 카드 4의 배경 프레임
      '136:7699', // 카드 5의 배경 프레임
    ];
    
    console.log('Frame 1261154908에서 순수한 배경 이미지 추출 중...\n');
    console.log('='.repeat(70));
    
    const pureBackgrounds = [];
    
    backgroundFrameIds.forEach((frameId, idx) => {
      const frame = findNodeById(data.document, frameId);
      if (frame && frame.fills && frame.fills.length > 0) {
        const imageFill = frame.fills.find(fill => fill.type === 'IMAGE');
        if (imageFill) {
          console.log(`카드 ${idx + 1} - Frame 1261154908:`);
          console.log(`  ID: ${frame.id}`);
          console.log(`  배경 이미지 ImageRef: ${imageFill.imageRef}`);
          console.log(`  배경 이미지 ImageHash: ${imageFill.imageHash || 'N/A'}\n`);
          
          pureBackgrounds.push({
            cardIndex: idx + 1,
            frameId: frame.id,
            imageRef: imageFill.imageRef,
            imageHash: imageFill.imageHash
          });
        } else {
          console.log(`카드 ${idx + 1} - Frame 1261154908: 이미지 fill을 찾을 수 없습니다.\n`);
        }
      } else {
        console.log(`카드 ${idx + 1} - Frame 1261154908: fills 속성을 찾을 수 없습니다.\n`);
      }
    });
    
    if (pureBackgrounds.length === 0) {
      console.log('❌ 순수한 배경 이미지를 찾을 수 없습니다.');
      return;
    }
    
    // 이미지 URL 가져오기 (imageRef 사용)
    console.log('='.repeat(70));
    console.log('순수한 배경 이미지 URL 가져오는 중...\n');
    
    const imageRefs = pureBackgrounds.map(bg => bg.imageRef);
    const response = await axios.get(
      `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`,
      {
        headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN },
        params: {
          ids: imageRefs.join(','),
          format: 'png',
          scale: 2,
        }
      }
    );
    
    console.log('순수한 배경 이미지 URL:\n');
    const cardsData = pureBackgrounds.map((bg, idx) => {
      const imageUrl = response.data.images[bg.imageRef];
      console.log(`카드 ${bg.cardIndex}:`);
      console.log(`  ImageRef: ${bg.imageRef}`);
      console.log(`  URL: ${imageUrl}\n`);
      
      return {
        id: bg.cardIndex,
        title: bg.cardIndex === 2 ? "Allnsight" : "프로젝트 이름",
        designer: bg.cardIndex === 2 ? "김선형 민혜진 심예원 임다인" : "디자이너 이름",
        description: "프로젝트에 대한 설명입니다.",
        backgroundSrc: imageUrl
      };
    });
    
    // JSON으로 저장
    fs.writeFileSync('./pure-background-images.json', JSON.stringify(cardsData, null, 2));
    console.log('✅ pure-background-images.json에 저장되었습니다.');
    
    return cardsData;
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getPureBackgroundImages();
