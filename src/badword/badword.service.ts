import { Injectable } from '@nestjs/common';
import { Badword } from './entities/badword.entity';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class BadwordService {
  private readonly ai = new GoogleGenAI({
    apiKey: process.env.AI_API_KEY,
  });

  async check({ text }: Badword): Promise<boolean> {
    try {
      const result = await this.callOpenAI(text);

      return result === 'true';
    } catch (error) {
      console.error('Error while checking the message: ', error);
      throw new Error('Error while checking the message');
    }
  }

  private async callOpenAI(text: string): Promise<string> {
    if (!text || text.trim() === '') {
      console.error('Invalid input: the text must be a non-empty string.');
      return 'false';
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are an assistant specialized in moderation. Please analyze messages and check if they contain offensive or profane words, considering the context. Users may find creative ways to bypass these words, using special characters, slang, or alternative spellings, but do not allow it. The tolerance must be 0%. If there are offensive words, respond "true", otherwise respond "false". Message: ${text}`,
    });

    if (!response || !response.text) {
      console.error('Error while calling the OpenAI API.');
      return 'false';
    }

    return response.text.trim().toLowerCase();
  }
}
