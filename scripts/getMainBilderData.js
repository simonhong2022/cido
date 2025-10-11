/**
 * Main_bilder의 정확한 데이터 추출
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getMainBilderData() {
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
    
    function findAllTexts(node, texts = []) {
      if (node.type === 'TEXT') {
        texts.push({
          text: node.characters,
          fontSize: node.style?.fontSize,
          fontWeight: node.style?.fontWeight,
        });
      }
      if (node.children) {
        node.children.forEach(child => findAllTexts(child, texts));
      }
      return texts;
    }
    
    const mainBilder = findNode(data.document, 'Main_bilder');
    if (!mainBilder || !mainBilder.children) {
      console.log('Main_bilder를 찾을 수 없습니다.');
      return;
    }
    
    console.log('Main_bilder 카드 데이터:\n');
    console.log('='.repeat(70));
    
    const cardNodeIds = [];
    
    mainBilder.children.forEach((card, idx) => {
      console.log(`\n카드 ${idx + 1}: ${card.name}`);
      console.log(`  Node ID: ${card.id}`);
      
      const texts = findAllTexts(card);
      if (texts.length > 0) {
        console.log('  텍스트:');
        texts.forEach(t => {
          if (t.text && t.text.length < 100) {
            console.log(`    - "${t.text}" (${t.fontSize}px, weight:${t.fontWeight})`);
          }
        });
      }
      
      cardNodeIds.push(card.id);
    });
    
    // 이미지 URL 가져오기
    console.log('\n\n' + '='.repeat(70));
    console.log('이미지 URL 가져오는 중...\n');
    
    const response = await axios.get(
      `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`,
      {
        headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN },
        params: {
          ids: cardNodeIds.join(','),
          format: 'png',
          scale: 2,
        }
      }
    );
    
    const cardsData = mainBilder.children.map((card, idx) => {
      const texts = findAllTexts(card);
      return {
        id: idx + 1,
        nodeId: card.id,
        title: texts[0]?.text || '프로젝트 이름',
        designer: texts[1]?.text || '디자이너 이름',
        imageUrl: response.data.images[card.id],
      };
    });
    
    console.log('\n카드 데이터:\n');
    cardsData.forEach(card => {
      console.log(`${card.id}. ${card.title}`);
      console.log(`   by ${card.designer}`);
      console.log(`   ${card.imageUrl}\n`);
    });
    
    // JSON으로 저장
    fs.writeFileSync('./main-bilder-data.json', JSON.stringify(cardsData, null, 2));
    console.log('✅ main-bilder-data.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

getMainBilderData();

