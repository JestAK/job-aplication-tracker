import { Module } from '@nestjs/common';
import { ApplicationTableController } from './application-table.controller';
import { ApplicationTableService } from './application-table.service';

@Module({
  controllers: [ApplicationTableController],
  providers: [ApplicationTableService],
})
export class ApplicationTableModule {}
