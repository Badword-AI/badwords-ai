import { Module } from '@nestjs/common';
import { BadwordService } from './badword.service';
import { BadwordController } from './badword.controller';

@Module({
  controllers: [BadwordController],
  providers: [BadwordService],
})
export class BadwordModule {}
