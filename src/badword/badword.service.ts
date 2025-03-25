import { Injectable } from '@nestjs/common';
import { Badword } from './entities/badword.entity';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class BadwordService {
  private readonly ai = new GoogleGenAI({
    apiKey: process.env.AI_API_KEY,
  });

  private cache = new Map<string, { result: string; expiresAt: number }>();

  async check({ text }: Badword): Promise<boolean> {
    if (!text || text.trim() === '') {
      console.error('Invalid input: the text must be a non-empty string.');
      return false;
    }

    const cacheKey = text;
    
    // 🔹 Verifica o cache antes de chamar a API
    const cachedData = this.cache.get(cacheKey);
    if (cachedData && cachedData.expiresAt > Date.now()) {
      console.log('Using cached data.');
      return cachedData.result === 'true';
    }

    try {
      const result = await this.callGoogleGenAI(text);
      
      // 🔹 Armazena no cache por 5 minutos
      this.cache.set(cacheKey, { result, expiresAt: Date.now() + 5 * 60 * 1000 });

      return result === 'true';
    } catch (error) {
      console.error('Error while checking the message: ', error);
      throw new Error('Error while checking the message');
    }
  }

  private async callGoogleGenAI(text: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `You are an assistant specialized in moderation. Please analyze messages and check if they contain offensive or profane words, considering the context. Users may find creative ways to bypass these words, using special characters, slang, or alternative spellings, but do not allow it. The tolerance must be 0%. If there are offensive words, respond "true", otherwise respond "false". Message: ${text}`,
      });

      if (!response || !response.text) {
        console.error('Error: No valid response from Google GenAI.');
        return 'false';
      }
  
      return response.text.trim().toLowerCase();
    } catch (error) {
      console.error('Error while calling the Google GenAI API: ', error);
      return 'false';
    }
  }
}
