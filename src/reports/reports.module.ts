import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
