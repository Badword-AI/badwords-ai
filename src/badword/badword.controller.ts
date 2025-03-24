import { Controller, Post, Body } from '@nestjs/common';
import { BadwordService } from './badword.service';
import { Badword } from './entities/badword.entity';

@Controller('badword')
export class BadwordController {
  constructor(private readonly badwordService: BadwordService) {}

  @Post()
  async check(@Body() badword: Badword): Promise<{ isBadword: boolean }> {
    const hasBadword = await this.badwordService.check(badword);

    return {
      isBadword: hasBadword,
    };
  }
}
