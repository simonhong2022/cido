/**
 * Figma API 연결 테스트 스크립트
 * Access Token과 File Key가 올바른지 확인합니다.
 */

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

console.log('🔍 Figma API 연결 테스트 시작...\n');

// 환경 변수 확인
console.log('📋 환경 변수 확인:');
console.log(`   FIGMA_ACCESS_TOKEN: ${FIGMA_ACCESS_TOKEN ? '✅ 설정됨 (' + FIGMA_ACCESS_TOKEN.substring(0, 10) + '...)' : '❌ 설정되지 않음'}`);
console.log(`   FIGMA_FILE_KEY: ${FIGMA_FILE_KEY ? '✅ 설정됨 (' + FIGMA_FILE_KEY + ')' : '❌ 설정되지 않음'}\n`);

if (!FIGMA_ACCESS_TOKEN || FIGMA_ACCESS_TOKEN === 'your_figma_personal_access_token_here') {
  console.error('❌ Error: FIGMA_ACCESS_TOKEN이 설정되지 않았습니다.');
  console.error('\n📝 설정 방법:');
  console.error('1. https://www.figma.com/settings 접속');
  console.error('2. "Personal Access Tokens" 섹션으로 이동');
  console.error('3. "Generate new token" 클릭');
  console.error('4. 생성된 토큰을 .env.local 파일에 추가\n');
  process.exit(1);
}

if (!FIGMA_FILE_KEY || FIGMA_FILE_KEY === 'your_figma_file_key_here') {
  console.error('❌ Error: FIGMA_FILE_KEY가 설정되지 않았습니다.');
  console.error('\n📝 설정 방법:');
  console.error('1. Figma 파일을 엽니다');
  console.error('2. URL에서 File Key를 복사합니다');
  console.error('   예: https://www.figma.com/file/abc123def456/MyDesign');
  console.error('   File Key = abc123def456');
  console.error('3. .env.local 파일에 추가\n');
  process.exit(1);
}

// Figma API 클라이언트 생성
const client = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_ACCESS_TOKEN,
  },
  timeout: 10000, // 10초 타임아웃
});

async function testConnection() {
  try {
    console.log('🌐 Figma API 연결 테스트 중...');
    console.log(`   URL: https://api.figma.com/v1/files/${FIGMA_FILE_KEY}\n`);

    const response = await client.get(`/files/${FIGMA_FILE_KEY}`);
    
    console.log('✅ 연결 성공!\n');
    console.log('📄 파일 정보:');
    console.log(`   이름: ${response.data.name}`);
    console.log(`   마지막 수정: ${response.data.lastModified}`);
    console.log(`   버전: ${response.data.version}`);
    console.log(`   썸네일: ${response.data.thumbnailUrl || 'N/A'}\n`);

    // 페이지 정보
    if (response.data.document && response.data.document.children) {
      console.log('📑 페이지 목록:');
      response.data.document.children.forEach((page, index) => {
        console.log(`   ${index + 1}. ${page.name}`);
      });
      console.log('');
    }

    console.log('🎉 모든 설정이 올바릅니다!');
    console.log('\n💡 다음 단계:');
    console.log('   npm run figma:fetch - 디자인 토큰 가져오기');
    
    return true;

  } catch (error) {
    console.error('\n❌ 연결 실패\n');

    if (error.code === 'ENOTFOUND') {
      console.error('🌐 네트워크 오류:');
      console.error('   인터넷 연결을 확인해주세요.\n');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      console.error('⏱️ 타임아웃 오류:');
      console.error('   네트워크가 느리거나 Figma 서버가 응답하지 않습니다.\n');
    } else if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.err || error.response.data?.message || error.response.statusText;

      console.error(`📊 HTTP 상태 코드: ${status}`);
      console.error(`📝 메시지: ${message}\n`);

      if (status === 403) {
        console.error('🔐 권한 오류 (403 Forbidden)');
        console.error('\n가능한 원인:');
        console.error('   1. Access Token이 유효하지 않습니다');
        console.error('   2. Access Token이 만료되었습니다');
        console.error('   3. 파일에 대한 접근 권한이 없습니다\n');
        console.error('해결 방법:');
        console.error('   1. https://www.figma.com/settings 에서 새 토큰 생성');
        console.error('   2. Figma 파일의 공유 설정 확인');
        console.error('   3. 파일 소유자에게 접근 권한 요청\n');
      } else if (status === 404) {
        console.error('📂 파일을 찾을 수 없음 (404 Not Found)');
        console.error('\n가능한 원인:');
        console.error('   1. File Key가 잘못되었습니다');
        console.error('   2. 파일이 삭제되었습니다');
        console.error('   3. 파일이 비공개로 설정되었습니다\n');
        console.error('해결 방법:');
        console.error('   1. Figma 파일 URL 다시 확인');
        console.error('      https://www.figma.com/file/FILE_KEY/...');
        console.error('   2. 파일이 존재하는지 확인');
        console.error('   3. 파일 공유 설정 확인\n');
      } else if (status === 401) {
        console.error('🔑 인증 실패 (401 Unauthorized)');
        console.error('\nAccess Token이 유효하지 않습니다.');
        console.error('새 토큰을 생성해주세요: https://www.figma.com/settings\n');
      } else if (status === 429) {
        console.error('⚠️ API 요청 한도 초과 (429 Too Many Requests)');
        console.error('\n잠시 후 다시 시도해주세요.\n');
      } else {
        console.error('❓ 알 수 없는 오류가 발생했습니다.\n');
      }
    } else {
      console.error('❓ 예상치 못한 오류:');
      console.error(`   ${error.message}\n`);
    }

    console.error('🔧 문제 해결 가이드:');
    console.error('   자세한 내용은 FIGMA_SETUP.md 파일을 참고하세요.\n');
    
    process.exit(1);
  }
}

// 실행
testConnection();

