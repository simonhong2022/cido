/**
 * Frame 1261154908에서 아이콘들을 제외한 배경 이미지 추출
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getBackgroundWithoutIcons() {
  try {
    console.log('Frame 1261154908에서 아이콘 제외한 배경 이미지 추출...\n');
    console.log('='.repeat(70));
    
    // 각 카드의 Frame 1261154908 ID들
    const backgroundFrameIds = [
      '136:7600', // 카드 1
      '136:7603', // 카드 2  
      '136:7663', // 카드 3
      '136:7681', // 카드 4
      '136:7699', // 카드 5
    ];
    
    // Frame 1261154738 (아이콘 프레임들) ID들
    const iconFrameIds = [
      '136:7367', // 카드 1의 아이콘 프레임
      '136:7604', // 카드 2의 아이콘 프레임
      '136:7664', // 카드 3의 아이콘 프레임
      '136:7682', // 카드 4의 아이콘 프레임
      '136:7700', // 카드 5의 아이콘 프레임
    ];
    
    console.log('방법 1: Frame 1261154908 자체 이미지 사용');
    console.log('(아이콘들이 오버레이로 추가되므로 배경만 가져올 수 있음)\n');
    
    // Frame 1261154908 자체의 이미지를 가져와보자
    const response = await axios.get(
      `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`,
      {
        headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN },
        params: {
          ids: backgroundFrameIds.join(','),
          format: 'png',
          scale: 2,
        }
      }
    );
    
    console.log('Frame 1261154908 배경 이미지 URL:\n');
    const cardsData = backgroundFrameIds.map((frameId, idx) => {
      const imageUrl = response.data.images[frameId];
      console.log(`카드 ${idx + 1}:`);
      console.log(`  Frame ID: ${frameId}`);
      console.log(`  URL: ${imageUrl}\n`);
      
      return {
        id: idx + 1,
        title: idx === 1 ? "Allnsight" : "프로젝트 이름",
        designer: idx === 1 ? "김선형 민혜진 심예원 임다인" : "디자이너 이름",
        description: "프로젝트에 대한 설명입니다.",
        src: imageUrl
      };
    });
    
    // JSON으로 저장
    fs.writeFileSync('./background-without-icons.json', JSON.stringify(cardsData, null, 2));
    console.log('✅ background-without-icons.json에 저장되었습니다.');
    
    console.log('\n' + '='.repeat(70));
    console.log('방법 2: Frame 1261154738 아이콘 이미지도 가져오기\n');
    
    // Frame 1261154738 (아이콘들) 이미지도 가져오기
    const iconResponse = await axios.get(
      `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`,
      {
        headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN },
        params: {
          ids: iconFrameIds.join(','),
          format: 'png',
          scale: 2,
        }
      }
    );
    
    console.log('Frame 1261154738 아이콘 이미지 URL:\n');
    iconFrameIds.forEach((frameId, idx) => {
      const imageUrl = iconResponse.data.images[frameId];
      console.log(`카드 ${idx + 1} 아이콘:`);
      console.log(`  Frame ID: ${frameId}`);
      console.log(`  URL: ${imageUrl}\n`);
    });
    
    return { cardsData, iconUrls: iconResponse.data.images };
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getBackgroundWithoutIcons();
