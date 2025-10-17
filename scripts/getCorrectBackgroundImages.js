/**
 * Main_bilder의 정확한 배경 이미지 추출
 * Frame 1261154908의 이미지들을 가져옵니다
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getCorrectBackgroundImages() {
  try {
    const data = JSON.parse(fs.readFileSync('./figma-node-136-7356.json', 'utf8'));
    
    function findNode(node, name) {
      if (node.name === name) return node;
      if (node.children) {
        for (let child of node.children) {
          const found = findNode(child, name);
          if (found) return found;
        }
      }
      return null;
    }
    
    function findBackgroundFrames(node, frames = []) {
      if (node.name === 'Frame 1261154908' && node.fills) {
        const imageFill = node.fills.find(fill => fill.type === 'IMAGE');
        if (imageFill) {
          frames.push({
            id: node.id,
            name: node.name,
            imageRef: imageFill.imageRef,
            imageHash: imageFill.imageHash
          });
        }
      }
      
      if (node.children) {
        node.children.forEach(child => findBackgroundFrames(child, frames));
      }
      return frames;
    }
    
    const mainBilder = findNode(data.document, 'Main_bilder');
    if (!mainBilder || !mainBilder.children) {
      console.log('Main_bilder를 찾을 수 없습니다.');
      return;
    }
    
    console.log('Main_bilder 배경 이미지 (Frame 1261154908) 찾는 중...\n');
    console.log('='.repeat(70));
    
    const backgroundFrames = findBackgroundFrames(mainBilder);
    console.log(`배경 이미지 프레임 개수: ${backgroundFrames.length}\n`);
    
    backgroundFrames.forEach((frame, idx) => {
      console.log(`배경 ${idx + 1}:`);
      console.log(`  ID: ${frame.id}`);
      console.log(`  ImageRef: ${frame.imageRef}`);
      console.log(`  ImageHash: ${frame.imageHash}\n`);
    });
    
    if (backgroundFrames.length === 0) {
      console.log('❌ 배경 이미지 프레임을 찾을 수 없습니다.');
      return;
    }
    
    // 이미지 URL 가져오기
    console.log('='.repeat(70));
    console.log('배경 이미지 URL 가져오는 중...\n');
    
    const imageIds = backgroundFrames.map(frame => frame.id);
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
    
    console.log('배경 이미지 URL:\n');
    const cardsData = backgroundFrames.map((frame, idx) => {
      const imageUrl = response.data.images[frame.id];
      console.log(`카드 ${idx + 1}:`);
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
    fs.writeFileSync('./correct-background-images.json', JSON.stringify(cardsData, null, 2));
    console.log('✅ correct-background-images.json에 저장되었습니다.');
    
    return cardsData;
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getCorrectBackgroundImages();
