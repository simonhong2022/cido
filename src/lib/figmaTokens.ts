/**
 * Figma 디자인 토큰 추출 유틸리티
 * Figma 파일에서 색상, 타이포그래피, 간격 등의 디자인 토큰을 추출합니다.
 */

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: any[];
  strokes?: any[];
  style?: any;
  absoluteBoundingBox?: any;
}

interface DesignTokens {
  colors: Record<string, string>;
  typography: Record<string, any>;
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  shadows: Record<string, string>;
}

/**
 * RGB 색상을 HEX로 변환
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * RGBA 색상을 CSS rgba() 형식으로 변환
 */
function rgbaToString(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
}

/**
 * Figma 노드에서 색상 추출
 */
export function extractColors(node: FigmaNode, colors: Record<string, string> = {}): Record<string, string> {
  // 노드 이름이 "Colors/" 또는 "색상/"으로 시작하는 경우 색상으로 처리
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

  // 자식 노드 재귀 처리
  if (node.children) {
    node.children.forEach(child => extractColors(child, colors));
  }

  return colors;
}

/**
 * Figma 노드에서 타이포그래피 스타일 추출
 */
export function extractTypography(node: FigmaNode, typography: Record<string, any> = {}): Record<string, any> {
  // TEXT 타입 노드에서 스타일 추출
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

  // 자식 노드 재귀 처리
  if (node.children) {
    node.children.forEach(child => extractTypography(child, typography));
  }

  return typography;
}

/**
 * Figma 노드에서 간격(spacing) 값 추출
 */
export function extractSpacing(node: FigmaNode, spacing: Record<string, number> = {}): Record<string, number> {
  // 노드 이름이 "Spacing/" 또는 "간격/"으로 시작하는 경우
  if (node.name?.startsWith('Spacing/') || node.name?.startsWith('간격/')) {
    if (node.absoluteBoundingBox) {
      const spacingName = node.name.split('/').pop()?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
      spacing[spacingName] = Math.round(node.absoluteBoundingBox.width || node.absoluteBoundingBox.height || 0);
    }
  }

  // 자식 노드 재귀 처리
  if (node.children) {
    node.children.forEach(child => extractSpacing(child, spacing));
  }

  return spacing;
}

/**
 * Figma 파일에서 모든 디자인 토큰 추출
 */
export function extractDesignTokens(figmaFile: any): DesignTokens {
  const tokens: DesignTokens = {
    colors: {},
    typography: {},
    spacing: {},
    borderRadius: {},
    shadows: {},
  };

  if (figmaFile.document) {
    // 문서 전체를 순회하며 토큰 추출
    tokens.colors = extractColors(figmaFile.document);
    tokens.typography = extractTypography(figmaFile.document);
    tokens.spacing = extractSpacing(figmaFile.document);
  }

  return tokens;
}

/**
 * 디자인 토큰을 CSS 변수로 변환
 */
export function tokensToCSS(tokens: DesignTokens): string {
  let css = ':root {\n';
  
  // Colors
  Object.entries(tokens.colors).forEach(([name, value]) => {
    css += `  --color-${name}: ${value};\n`;
  });

  // Typography
  Object.entries(tokens.typography).forEach(([name, styles]) => {
    css += `  --typography-${name}-font-family: ${styles.fontFamily};\n`;
    css += `  --typography-${name}-font-size: ${styles.fontSize};\n`;
    css += `  --typography-${name}-font-weight: ${styles.fontWeight};\n`;
    css += `  --typography-${name}-line-height: ${styles.lineHeight};\n`;
    css += `  --typography-${name}-letter-spacing: ${styles.letterSpacing};\n`;
  });

  // Spacing
  Object.entries(tokens.spacing).forEach(([name, value]) => {
    css += `  --spacing-${name}: ${value}px;\n`;
  });

  css += '}\n';
  return css;
}

/**
 * 디자인 토큰을 TypeScript 타입으로 변환
 */
export function tokensToTypeScript(tokens: DesignTokens): string {
  let ts = '// Auto-generated design tokens from Figma\n\n';
  
  ts += 'export const colors = {\n';
  Object.entries(tokens.colors).forEach(([name, value]) => {
    ts += `  '${name}': '${value}',\n`;
  });
  ts += '} as const;\n\n';

  ts += 'export const typography = {\n';
  Object.entries(tokens.typography).forEach(([name, styles]) => {
    ts += `  '${name}': ${JSON.stringify(styles, null, 2)},\n`;
  });
  ts += '} as const;\n\n';

  ts += 'export const spacing = {\n';
  Object.entries(tokens.spacing).forEach(([name, value]) => {
    ts += `  '${name}': ${value},\n`;
  });
  ts += '} as const;\n';

  return ts;
}

