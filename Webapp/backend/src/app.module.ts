import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { AssetsModule } from './assets/assets.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './rules_management.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // CRITICAL: Set to false in production
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    AssetsModule,
    SeedModule,
  ],
})
export class AppModule {}
