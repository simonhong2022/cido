import axios, { AxiosInstance } from 'axios';

/**
 * Figma API 클라이언트
 * Figma REST API와 통신하여 디자인 데이터를 가져옵니다.
 */
class FigmaClient {
  private client: AxiosInstance;
  private fileKey: string;

  constructor(accessToken: string, fileKey: string) {
    this.fileKey = fileKey;
    this.client = axios.create({
      baseURL: 'https://api.figma.com/v1',
      headers: {
        'X-Figma-Token': accessToken,
      },
    });
  }

  /**
   * Figma 파일의 전체 데이터를 가져옵니다.
   */
  async getFile() {
    try {
      const response = await this.client.get(`/files/${this.fileKey}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Figma file:', error);
      throw error;
    }
  }

  /**
   * 특정 노드의 데이터를 가져옵니다.
   * @param nodeIds - 가져올 노드 ID 배열
   */
  async getNodes(nodeIds: string[]) {
    try {
      const ids = nodeIds.join(',');
      const response = await this.client.get(`/files/${this.fileKey}/nodes`, {
        params: { ids },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Figma nodes:', error);
      throw error;
    }
  }

  /**
   * 파일의 스타일 정보를 가져옵니다.
   */
  async getFileStyles() {
    try {
      const response = await this.client.get(`/files/${this.fileKey}/styles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Figma styles:', error);
      throw error;
    }
  }

  /**
   * 이미지 URL을 가져옵니다.
   * @param nodeIds - 이미지로 내보낼 노드 ID 배열
   * @param options - 이미지 옵션 (format, scale 등)
   */
  async getImages(
    nodeIds: string[],
    options: {
      format?: 'jpg' | 'png' | 'svg' | 'pdf';
      scale?: number;
    } = {}
  ) {
    try {
      const ids = nodeIds.join(',');
      const response = await this.client.get(`/images/${this.fileKey}`, {
        params: {
          ids,
          format: options.format || 'png',
          scale: options.scale || 1,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Figma images:', error);
      throw error;
    }
  }

  /**
   * 컴포넌트 정보를 가져옵니다.
   */
  async getFileComponents() {
    try {
      const response = await this.client.get(`/files/${this.fileKey}/components`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Figma components:', error);
      throw error;
    }
  }
}

export default FigmaClient;

