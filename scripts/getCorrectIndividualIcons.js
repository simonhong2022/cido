const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getCorrectIndividualIcons() {
  try {
    console.log('정확한 개별 아이콘 이미지 URL 가져오는 중...\n');
    
    // 앞서 찾은 정확한 아이콘 ID들 사용
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
    
    console.log('======================================================================');
    console.log('개별 아이콘 이미지 URL:');
    console.log('======================================================================\n');
    
    const response = await axios.post(`https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}`, {
      ids: iconNodes.flatMap(card => [card.heart, card.bookmark]),
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
      console.log(`  하트 아이콘: ${images[card.heart]}`);
      console.log(`  북마크 아이콘: ${images[card.bookmark]}`);
      console.log('');
    });
    
    // JSON 파일로 저장
    const iconData = iconNodes.map((card, index) => ({
      cardId: index + 1,
      heartIcon: images[card.heart],
      bookmarkIcon: images[card.bookmark]
    }));
    
    const fs = require('fs');
    fs.writeFileSync('correct-individual-icons.json', JSON.stringify(iconData, null, 2));
    
    console.log('✅ correct-individual-icons.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.response) {
      console.error('응답 데이터:', error.response.data);
    }
  }
}

getCorrectIndividualIcons();
