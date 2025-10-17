const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getSeparateIcons() {
  try {
    console.log('개별 북마크 및 하트 아이콘 이미지 가져오는 중...\n');
    
    // 각 카드의 개별 아이콘 ID
    const iconIds = {
      // 카드 1: 첫 번째 All Icons (북마크)
      card1_bookmark: '136:7368',
      // 카드 1: 두 번째 All Icons (하트)
      card1_heart: '136:7374',
      
      // 카드 2: 첫 번째 All Icons (북마크)
      card2_bookmark: '136:7605',
      // 카드 2: 두 번째 All Icons (하트)
      card2_heart: '136:7611',
      
      // 카드 3: 첫 번째 All Icons (북마크)
      card3_bookmark: '136:7665',
      // 카드 3: 두 번째 All Icons (하트)
      card3_heart: '136:7671',
      
      // 카드 4: 첫 번째 All Icons (북마크)
      card4_bookmark: '136:7683',
      // 카드 4: 두 번째 All Icons (하트)
      card4_heart: '136:7689',
      
      // 카드 5: 첫 번째 All Icons (북마크)
      card5_bookmark: '136:7701',
      // 카드 5: 두 번째 All Icons (하트)
      card5_heart: '136:7707',
    };
    
    const allIds = Object.values(iconIds);
    
    console.log('======================================================================');
    console.log('개별 아이콘 이미지 URL:');
    console.log('======================================================================\n');
    
    const response = await axios.get(
      `https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}?ids=${allIds.join(',')}&format=png&scale=2`,
      {
        headers: {
          'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
        },
      }
    );
    
    const images = response.data.images;
    
    console.log('카드 1:');
    console.log(`  북마크 아이콘: ${images[iconIds.card1_bookmark]}`);
    console.log(`  하트 아이콘: ${images[iconIds.card1_heart]}`);
    console.log('');
    
    console.log('카드 2:');
    console.log(`  북마크 아이콘: ${images[iconIds.card2_bookmark]}`);
    console.log(`  하트 아이콘: ${images[iconIds.card2_heart]}`);
    console.log('');
    
    console.log('카드 3:');
    console.log(`  북마크 아이콘: ${images[iconIds.card3_bookmark]}`);
    console.log(`  하트 아이콘: ${images[iconIds.card3_heart]}`);
    console.log('');
    
    console.log('카드 4:');
    console.log(`  북마크 아이콘: ${images[iconIds.card4_bookmark]}`);
    console.log(`  하트 아이콘: ${images[iconIds.card4_heart]}`);
    console.log('');
    
    console.log('카드 5:');
    console.log(`  북마크 아이콘: ${images[iconIds.card5_bookmark]}`);
    console.log(`  하트 아이콘: ${images[iconIds.card5_heart]}`);
    console.log('');
    
    // JSON 파일로 저장
    const iconData = {
      card1: {
        bookmark: images[iconIds.card1_bookmark],
        heart: images[iconIds.card1_heart]
      },
      card2: {
        bookmark: images[iconIds.card2_bookmark],
        heart: images[iconIds.card2_heart]
      },
      card3: {
        bookmark: images[iconIds.card3_bookmark],
        heart: images[iconIds.card3_heart]
      },
      card4: {
        bookmark: images[iconIds.card4_bookmark],
        heart: images[iconIds.card4_heart]
      },
      card5: {
        bookmark: images[iconIds.card5_bookmark],
        heart: images[iconIds.card5_heart]
      }
    };
    
    const fs = require('fs');
    fs.writeFileSync('separate-icons.json', JSON.stringify(iconData, null, 2));
    
    console.log('✅ separate-icons.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.response) {
      console.error('응답 데이터:', error.response.data);
    }
  }
}

getSeparateIcons();
