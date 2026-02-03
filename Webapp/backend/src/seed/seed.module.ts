import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { Asset } from '../assets/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, Asset])],
  providers: [SeedService],
  controllers: [SeedController],
  exports: [SeedService],
})
export class SeedModule {}
