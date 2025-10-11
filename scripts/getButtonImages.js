/**
 * 4개 버튼의 이미지 URL 가져오기
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getButtonImages() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    // Button 섹션 찾기
    const frame1918 = data.document.children.find(c => c.name === 'Frame 1261154918');
    const frame1919 = frame1918.children.find(c => c.name === 'Frame 1261154919');
    const buttonSection = frame1919.children.find(c => c.name === 'Button');
    
    // 각 버튼의 node ID 수집
    const nodeIds = buttonSection.children.map(btn => btn.id);
    
    console.log('버튼 이미지 가져오는 중...\n');
    
    // Figma API로 이미지 URL 가져오기
    const response = await axios.get(
      `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`,
      {
        headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN },
        params: {
          ids: nodeIds.join(','),
          format: 'png',
          scale: 2,
        }
      }
    );
    
    console.log('이미지 URLs:\n');
    buttonSection.children.forEach((btn, idx) => {
      const url = response.data.images[btn.id];
      console.log(`${idx + 1}. ${btn.name}`);
      console.log(`   ${url}\n`);
    });
    
    // JSON으로 저장
    fs.writeFileSync('./button-images.json', JSON.stringify({
      buttons: buttonSection.children.map(btn => ({
        name: btn.name,
        id: btn.id,
        imageUrl: response.data.images[btn.id]
      }))
    }, null, 2));
    
    console.log('✅ button-images.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 에러:', error.response?.data || error.message);
  }
}

getButtonImages();

