/**
 * Figma 특정 노드 정보 가져오기
 * node-id=136-7356
 */

const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const NODE_ID = '136:7356'; // URL의 136-7356을 136:7356으로 변환

const client = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_ACCESS_TOKEN,
  },
});

async function getSpecificNode() {
  try {
    console.log('🔍 특정 노드 정보 가져오는 중...');
    console.log(`Node ID: ${NODE_ID}\n`);

    const response = await client.get(`/files/${FIGMA_FILE_KEY}/nodes`, {
      params: { ids: NODE_ID }
    });

    const nodeData = response.data.nodes[NODE_ID];
    
    if (!nodeData) {
      console.log('❌ 노드를 찾을 수 없습니다.');
      return;
    }

    console.log('✅ 노드 찾음!\n');
    console.log('노드 정보:');
    console.log(`- 이름: ${nodeData.document.name}`);
    console.log(`- 타입: ${nodeData.document.type}`);
    
    if (nodeData.document.absoluteBoundingBox) {
      const box = nodeData.document.absoluteBoundingBox;
      console.log(`- 크기: ${Math.round(box.width)} x ${Math.round(box.height)}`);
    }

    // 구조 분석
    console.log('\n구조:');
    analyzeNode(nodeData.document, 0);

    // JSON 저장
    fs.writeFileSync('./figma-node-136-7356.json', JSON.stringify(nodeData, null, 2));
    console.log('\n\n💾 상세 정보가 figma-node-136-7356.json에 저장되었습니다.');

  } catch (error) {
    console.error('❌ 에러:', error.response?.data || error.message);
  }
}

function analyzeNode(node, depth, maxDepth = 4) {
  const indent = '  '.repeat(depth);
  console.log(`${indent}├─ [${node.type}] ${node.name}`);
  
  if (node.type === 'TEXT' && node.characters) {
    console.log(`${indent}   └─ "${node.characters.substring(0, 100)}"`);
  }
  
  if (node.absoluteBoundingBox) {
    const { width, height } = node.absoluteBoundingBox;
    console.log(`${indent}   └─ ${Math.round(width)} x ${Math.round(height)}`);
  }
  
  if (node.children && depth < maxDepth) {
    node.children.slice(0, 10).forEach(child => analyzeNode(child, depth + 1, maxDepth));
    if (node.children.length > 10) {
      console.log(`${indent}   └─ ... (${node.children.length - 10}개 더)`);
    }
  }
}

getSpecificNode();

