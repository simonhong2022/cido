/**
 * 아이콘이 없는 깔끔한 배경 이미지 추출
 * Frame 1261154908에서 All Icons를 제외한 배경만 가져옵니다
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getCleanBackgroundImages() {
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
    
    console.log('Frame 1261154908 구조 분석 (아이콘 제외):\n');
    console.log('='.repeat(70));
    
    const cleanBackgrounds = [];
    
    backgroundFrameIds.forEach((frameId, idx) => {
      const frame = findNodeById(data.document, frameId);
      if (frame) {
        console.log(`카드 ${idx + 1} - Frame 1261154908 분석:`);
        console.log(`  ID: ${frame.id}`);
        console.log(`  타입: ${frame.type}`);
        
        if (frame.absoluteBoundingBox) {
          const { x, y, width, height } = frame.absoluteBoundingBox;
          console.log(`  위치: x:${Math.round(x)}, y:${Math.round(y)}, 크기: ${Math.round(width)}x${Math.round(height)}`);
        }
        
        // 자식 요소들 확인
        if (frame.children && frame.children.length > 0) {
          console.log(`  자식 요소 (${frame.children.length}개):`);
          frame.children.forEach((child, childIdx) => {
            console.log(`    ${childIdx + 1}. ${child.name} (${child.type}) - ID: ${child.id}`);
            
            // All Icons가 아닌 요소들만 추출
            if (!child.name.includes('All Icons')) {
              if (child.fills && child.fills.length > 0) {
                child.fills.forEach(fill => {
                  if (fill.type === 'IMAGE') {
                    console.log(`       🖼️  배경 이미지: ${fill.imageRef}`);
                    cleanBackgrounds.push({
                      cardIndex: idx + 1,
                      frameId: frame.id,
                      backgroundId: child.id,
                      backgroundName: child.name,
                      imageRef: fill.imageRef
                    });
                  }
                });
              }
            } else {
              console.log(`       🚫 아이콘 프레임 (제외): ${child.name}`);
            }
          });
        }
        console.log('');
      }
    });
    
    if (cleanBackgrounds.length === 0) {
      console.log('❌ 깔끔한 배경 이미지를 찾을 수 없습니다.');
      console.log('Frame 1261154908 자체의 이미지를 사용해야 할 수도 있습니다.');
      return;
    }
    
    // 이미지 URL 가져오기
    console.log('='.repeat(70));
    console.log('깔끔한 배경 이미지 URL 가져오는 중...\n');
    
    const imageIds = cleanBackgrounds.map(bg => bg.backgroundId);
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
    
    console.log('깔끔한 배경 이미지 URL:\n');
    const cardsData = cleanBackgrounds.map((bg, idx) => {
      const imageUrl = response.data.images[bg.backgroundId];
      console.log(`카드 ${bg.cardIndex}:`);
      console.log(`  배경: ${bg.backgroundName}`);
      console.log(`  URL: ${imageUrl}\n`);
      
      return {
        id: bg.cardIndex,
        title: bg.cardIndex === 2 ? "Allnsight" : "프로젝트 이름",
        designer: bg.cardIndex === 2 ? "김선형 민혜진 심예원 임다인" : "디자이너 이름",
        description: "프로젝트에 대한 설명입니다.",
        src: imageUrl
      };
    });
    
    // JSON으로 저장
    fs.writeFileSync('./clean-background-images.json', JSON.stringify(cardsData, null, 2));
    console.log('✅ clean-background-images.json에 저장되었습니다.');
    
    return cardsData;
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getCleanBackgroundImages();
