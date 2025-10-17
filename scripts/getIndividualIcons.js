const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getIndividualIcons() {
  try {
    console.log('개별 아이콘 이미지 URL 가져오는 중...\n');
    
    // Main_bilder의 5개 카드에서 개별 아이콘들 추출
    const iconNodes = [
      // 카드 1
      { heart: '136:7369', bookmark: '136:7374' },
      // 카드 2  
      { heart: '136:7606', bookmark: '136:7611' },
      // 카드 3
      { heart: '136:7666', bookmark: '136:7671' },
      // 카드 4
      { heart: '136:7684', bookmark: '136:7689' },
      // 카드 5
      { heart: '136:7702', bookmark: '136:7707' }
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
    fs.writeFileSync('individual-icons.json', JSON.stringify(iconData, null, 2));
    
    console.log('✅ individual-icons.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

getIndividualIcons();
