const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getFinalIndividualIcons() {
  try {
    console.log('최종 개별 아이콘 이미지 URL 가져오는 중...\n');
    
    // 정확한 아이콘 ID들 사용
    const iconNodes = [
      // 카드 1: 첫 번째 All Icons 136:7368, 두 번째 All Icons 136:7374
      { bookmark: '136:7368', heart: '136:7374' },
      // 카드 2: 첫 번째 All Icons 136:7605, 두 번째 All Icons 136:7611
      { bookmark: '136:7605', heart: '136:7611' },
      // 카드 3: 첫 번째 All Icons 136:7665, 두 번째 All Icons 136:7671
      { bookmark: '136:7665', heart: '136:7671' },
      // 카드 4: 첫 번째 All Icons 136:7683, 두 번째 All Icons 136:7689
      { bookmark: '136:7683', heart: '136:7689' },
      // 카드 5: 첫 번째 All Icons 136:7701, 두 번째 All Icons 136:7707
      { bookmark: '136:7701', heart: '136:7707' }
    ];
    
    console.log('======================================================================');
    console.log('개별 아이콘 이미지 URL:');
    console.log('======================================================================\n');
    
    const response = await axios.post(`https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}`, {
      ids: iconNodes.flatMap(card => [card.bookmark, card.heart]),
      format: 'png',
      scale: 2
    }, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
      },
    });
    
    const images = response.data.images;
    
    iconNodes.forEach((card, index) => {
      console.log(`카드 ${index + 1}:`);
      console.log(`  북마크 아이콘: ${images[card.bookmark]}`);
      console.log(`  하트 아이콘: ${images[card.heart]}`);
      console.log('');
    });
    
    // JSON 파일로 저장
    const iconData = iconNodes.map((card, index) => ({
      cardId: index + 1,
      bookmarkIcon: images[card.bookmark],
      heartIcon: images[card.heart]
    }));
    
    const fs = require('fs');
    fs.writeFileSync('final-individual-icons.json', JSON.stringify(iconData, null, 2));
    
    console.log('✅ final-individual-icons.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.response) {
      console.error('응답 데이터:', error.response.data);
    }
  }
}

getFinalIndividualIcons();
