/**
 * Figma 특정 페이지 분석 스크립트
 * Home 페이지의 구조와 디자인 정보를 가져옵니다
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

const client = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_ACCESS_TOKEN,
  },
});

async function analyzeFigmaPage() {
  try {
    console.log('🔍 Figma 파일 정보 가져오는 중...\n');
    
    const response = await client.get(`/files/${FIGMA_FILE_KEY}`);
    const figmaFile = response.data;

    console.log(`📄 파일: ${figmaFile.name}\n`);
    console.log('📑 페이지 목록:\n');

    // 모든 페이지 출력
    figmaFile.document.children.forEach((page, index) => {
      console.log(`${index + 1}. ${page.name}`);
    });

    // Home 페이지 찾기
    const homePage = figmaFile.document.children.find(
      page => page.name === 'Home✅' || page.name === 'Home' || page.name.toLowerCase().includes('home')
    );

    if (homePage) {
      console.log('\n\n✅ Home 페이지를 찾았습니다!\n');
      console.log(`페이지 이름: ${homePage.name}`);
      console.log(`페이지 ID: ${homePage.id}`);
      console.log(`\n구조:\n`);
      
      // 페이지 구조 분석
      analyzeNode(homePage, 0);

      // JSON으로 저장
      const outputPath = './figma-home-page.json';
      fs.writeFileSync(outputPath, JSON.stringify(homePage, null, 2));
      console.log(`\n\n💾 상세 정보가 ${outputPath}에 저장되었습니다.`);
    } else {
      console.log('\n\n❌ Home 페이지를 찾을 수 없습니다.');
      console.log('사용 가능한 페이지 중 하나를 선택해주세요.');
    }

  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

function analyzeNode(node, depth) {
  const indent = '  '.repeat(depth);
  const type = node.type;
  const name = node.name || '(이름 없음)';
  
  console.log(`${indent}├─ [${type}] ${name}`);

  // 텍스트 노드인 경우 내용 표시
  if (type === 'TEXT' && node.characters) {
    console.log(`${indent}   └─ 텍스트: "${node.characters}"`);
  }

  // 프레임이나 컴포넌트인 경우 크기 표시
  if (node.absoluteBoundingBox) {
    const { width, height } = node.absoluteBoundingBox;
    console.log(`${indent}   └─ 크기: ${Math.round(width)} x ${Math.round(height)}`);
  }

  // 자식 노드가 있으면 재귀적으로 분석 (최대 3단계까지)
  if (node.children && depth < 3) {
    node.children.forEach(child => analyzeNode(child, depth + 1));
  } else if (node.children && depth >= 3) {
    console.log(`${indent}   └─ ... (${node.children.length}개의 자식 노드)`);
  }
}

analyzeFigmaPage();

