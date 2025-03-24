import { Module } from '@nestjs/common';
import { BadwordModule } from './badword/badword.module';

@Module({
  imports: [BadwordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
