const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getExactIndividualIcons() {
  try {
    console.log('정확한 개별 아이콘 이미지 URL 가져오는 중...\n');
    
    // 앞서 찾은 결과에서 정확한 ID들 사용
    const iconNodes = [
      // 카드 1: All Icons 136:7368, heart.circle.fill 136:7369
      { heart: '136:7369', bookmark: '136:7368' },
      // 카드 2: All Icons 136:7374, heart.circle.fill 136:7375  
      { heart: '136:7375', bookmark: '136:7374' },
      // 카드 3: All Icons 136:7605, heart.circle.fill 136:7606
      { heart: '136:7606', bookmark: '136:7605' },
      // 카드 4: All Icons 136:7665, heart.circle.fill 136:7666
      { heart: '136:7666', bookmark: '136:7665' },
      // 카드 5: All Icons 136:7683, heart.circle.fill 136:7684
      { heart: '136:7684', bookmark: '136:7683' }
    ];
    
    // 먼저 하트 아이콘들만 시도
    console.log('하트 아이콘들만 먼저 시도...');
    const heartIds = iconNodes.map(card => card.heart);
    
    const response = await axios.post(`https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}`, {
      ids: heartIds,
      format: 'png',
      scale: 2
    }, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
      },
    });
    
    const images = response.data.images;
    
    console.log('======================================================================');
    console.log('하트 아이콘 이미지 URL:');
    console.log('======================================================================\n');
    
    heartIds.forEach((id, index) => {
      console.log(`카드 ${index + 1} 하트 아이콘 (${id}): ${images[id]}`);
    });
    
    // 이제 북마크 아이콘들 시도
    console.log('\n북마크 아이콘들 시도...');
    const bookmarkIds = iconNodes.map(card => card.bookmark);
    
    const response2 = await axios.post(`https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}`, {
      ids: bookmarkIds,
      format: 'png',
      scale: 2
    }, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
      },
    });
    
    const images2 = response2.data.images;
    
    console.log('\n======================================================================');
    console.log('북마크 아이콘 이미지 URL:');
    console.log('======================================================================\n');
    
    bookmarkIds.forEach((id, index) => {
      console.log(`카드 ${index + 1} 북마크 아이콘 (${id}): ${images2[id]}`);
    });
    
    // JSON 파일로 저장
    const iconData = iconNodes.map((card, index) => ({
      cardId: index + 1,
      heartIcon: images[card.heart],
      bookmarkIcon: images2[card.bookmark]
    }));
    
    const fs = require('fs');
    fs.writeFileSync('exact-individual-icons.json', JSON.stringify(iconData, null, 2));
    
    console.log('\n✅ exact-individual-icons.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.response) {
      console.error('응답 데이터:', error.response.data);
    }
  }
}

getExactIndividualIcons();
