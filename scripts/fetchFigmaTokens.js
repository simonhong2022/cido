/**
 * Figma 디자인 토큰 추출 스크립트
 * 
 * 사용법:
 * 1. .env.local 파일에 FIGMA_ACCESS_TOKEN과 FIGMA_FILE_KEY 설정
 * 2. npm run figma:fetch 실행
 * 
 * 이 스크립트는 Figma 파일에서 디자인 토큰을 추출하여:
 * - src/styles/tokens.css (CSS 변수)
 * - src/styles/tokens.ts (TypeScript 상수)
 * 파일로 저장합니다.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ Error: FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY must be set in .env.local');
  console.error('\n📝 Setup instructions:');
  console.error('1. Copy .env.example to .env.local');
  console.error('2. Get your Figma access token from: https://www.figma.com/developers/api#access-tokens');
  console.error('3. Get your Figma file key from the URL: https://www.figma.com/file/FILE_KEY/...');
  process.exit(1);
}

const client = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_ACCESS_TOKEN,
  },
});

// RGB를 HEX로 변환
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// RGBA를 CSS rgba() 형식으로 변환
function rgbaToString(r, g, b, a) {
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
}

// 색상 추출
function extractColors(node, colors = {}) {
  if (node.name?.startsWith('Colors/') || node.name?.startsWith('색상/')) {
    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b } = fill.color;
        const opacity = fill.opacity !== undefined ? fill.opacity : 1;
        const colorName = node.name.split('/').pop()?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
        
        if (opacity < 1) {
          colors[colorName] = rgbaToString(r, g, b, opacity);
        } else {
          colors[colorName] = rgbToHex(r, g, b);
        }
      }
    }
  }

  if (node.children) {
    node.children.forEach(child => extractColors(child, colors));
  }

  return colors;
}

// 타이포그래피 추출
function extractTypography(node, typography = {}) {
  if (node.type === 'TEXT' && node.style) {
    const styleName = node.name.toLowerCase().replace(/\s+/g, '-');
    typography[styleName] = {
      fontFamily: node.style.fontFamily || 'inherit',
      fontSize: node.style.fontSize ? `${node.style.fontSize}px` : 'inherit',
      fontWeight: node.style.fontWeight || 'normal',
      lineHeight: node.style.lineHeightPx ? `${node.style.lineHeightPx}px` : 'normal',
      letterSpacing: node.style.letterSpacing ? `${node.style.letterSpacing}px` : 'normal',
    };
  }

  if (node.children) {
    node.children.forEach(child => extractTypography(child, typography));
  }

  return typography;
}

// 간격 추출
function extractSpacing(node, spacing = {}) {
  if (node.name?.startsWith('Spacing/') || node.name?.startsWith('간격/')) {
    if (node.absoluteBoundingBox) {
      const spacingName = node.name.split('/').pop()?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
      spacing[spacingName] = Math.round(node.absoluteBoundingBox.width || node.absoluteBoundingBox.height || 0);
    }
  }

  if (node.children) {
    node.children.forEach(child => extractSpacing(child, spacing));
  }

  return spacing;
}

// 디자인 토큰을 CSS로 변환
function tokensToCSS(tokens) {
  let css = '/* Auto-generated from Figma - Do not edit manually */\n\n:root {\n';
  
  // Colors
  if (Object.keys(tokens.colors).length > 0) {
    css += '  /* Colors */\n';
    Object.entries(tokens.colors).forEach(([name, value]) => {
      css += `  --color-${name}: ${value};\n`;
    });
    css += '\n';
  }

  // Typography
  if (Object.keys(tokens.typography).length > 0) {
    css += '  /* Typography */\n';
    Object.entries(tokens.typography).forEach(([name, styles]) => {
      css += `  --typography-${name}-font-family: ${styles.fontFamily};\n`;
      css += `  --typography-${name}-font-size: ${styles.fontSize};\n`;
      css += `  --typography-${name}-font-weight: ${styles.fontWeight};\n`;
      css += `  --typography-${name}-line-height: ${styles.lineHeight};\n`;
      css += `  --typography-${name}-letter-spacing: ${styles.letterSpacing};\n`;
    });
    css += '\n';
  }

  // Spacing
  if (Object.keys(tokens.spacing).length > 0) {
    css += '  /* Spacing */\n';
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      css += `  --spacing-${name}: ${value}px;\n`;
    });
    css += '\n';
  }

  css += '}\n';
  return css;
}

// 디자인 토큰을 TypeScript로 변환
function tokensToTypeScript(tokens) {
  let ts = '// Auto-generated from Figma - Do not edit manually\n\n';
  
  ts += 'export const colors = {\n';
  Object.entries(tokens.colors).forEach(([name, value]) => {
    ts += `  '${name}': '${value}',\n`;
  });
  ts += '} as const;\n\n';

  ts += 'export const typography = {\n';
  Object.entries(tokens.typography).forEach(([name, styles]) => {
    ts += `  '${name}': ${JSON.stringify(styles, null, 2).replace(/\n/g, '\n  ')},\n`;
  });
  ts += '} as const;\n\n';

  ts += 'export const spacing = {\n';
  Object.entries(tokens.spacing).forEach(([name, value]) => {
    ts += `  '${name}': ${value},\n`;
  });
  ts += '} as const;\n\n';

  ts += 'export type ColorKey = keyof typeof colors;\n';
  ts += 'export type TypographyKey = keyof typeof typography;\n';
  ts += 'export type SpacingKey = keyof typeof spacing;\n';

  return ts;
}

// 메인 실행 함수
async function main() {
  try {
    console.log('🎨 Fetching design tokens from Figma...\n');
    console.log(`📄 File Key: ${FIGMA_FILE_KEY}\n`);

    // Figma 파일 가져오기
    const response = await client.get(`/files/${FIGMA_FILE_KEY}`);
    const figmaFile = response.data;

    console.log(`✅ Successfully fetched Figma file: ${figmaFile.name}\n`);

    // 디자인 토큰 추출
    console.log('🔍 Extracting design tokens...\n');
    const tokens = {
      colors: extractColors(figmaFile.document),
      typography: extractTypography(figmaFile.document),
      spacing: extractSpacing(figmaFile.document),
    };

    console.log(`   📦 Colors: ${Object.keys(tokens.colors).length} found`);
    console.log(`   📦 Typography: ${Object.keys(tokens.typography).length} found`);
    console.log(`   📦 Spacing: ${Object.keys(tokens.spacing).length} found\n`);

    // CSS 파일 생성
    const cssContent = tokensToCSS(tokens);
    const cssPath = path.join(__dirname, '../src/styles/tokens.css');
    fs.writeFileSync(cssPath, cssContent);
    console.log(`✅ CSS tokens saved to: ${cssPath}`);

    // TypeScript 파일 생성
    const tsContent = tokensToTypeScript(tokens);
    const tsPath = path.join(__dirname, '../src/styles/tokens.ts');
    fs.writeFileSync(tsPath, tsContent);
    console.log(`✅ TypeScript tokens saved to: ${tsPath}`);

    // JSON 파일도 생성 (디버깅용)
    const jsonPath = path.join(__dirname, '../src/styles/tokens.json');
    fs.writeFileSync(jsonPath, JSON.stringify(tokens, null, 2));
    console.log(`✅ JSON tokens saved to: ${jsonPath}`);

    console.log('\n🎉 Design tokens successfully extracted!\n');
    console.log('💡 Usage:');
    console.log('   - Import CSS: import "@/styles/tokens.css"');
    console.log('   - Import TS: import { colors, typography, spacing } from "@/styles/tokens"');
    
  } catch (error) {
    console.error('\n❌ Error fetching Figma tokens:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.err || error.response.statusText}`);
      
      if (error.response.status === 403) {
        console.error('\n💡 Troubleshooting:');
        console.error('   - Check if your FIGMA_ACCESS_TOKEN is valid');
        console.error('   - Ensure you have access to the file');
      } else if (error.response.status === 404) {
        console.error('\n💡 Troubleshooting:');
        console.error('   - Check if your FIGMA_FILE_KEY is correct');
        console.error('   - Verify the file exists and is accessible');
      }
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

main();

