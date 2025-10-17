const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function getFrame1261154913Background() {
  try {
    console.log('Frame 1261154913 (카드 5) 배경 이미지 가져오는 중...\n');
    
    // Frame 1261154913 -> Frame 1261154908의 ID: 136:7699
    const nodeId = '136:7699';
    
    console.log('======================================================================');
    console.log('Frame 1261154908 (카드 5 배경) 이미지 URL:');
    console.log('======================================================================\n');
    
    const response = await axios.post(`https://api.figma.com/v1/images/${process.env.FIGMA_FILE_KEY}`, {
      ids: [nodeId],
      format: 'png',
      scale: 2
    }, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
      },
    });
    
    const images = response.data.images;
    
    console.log(`카드 5 배경 이미지: ${images[nodeId]}`);
    console.log('\n✅ Frame 1261154913의 배경 이미지를 가져왔습니다.');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.response) {
      console.error('응답 데이터:', error.response.data);
    }
  }
}

getFrame1261154913Background();
