import { Controller, Post, Delete, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('status')
  async getStatus() {
    return {
      message: 'Seed endpoints available',
      endpoints: {
        'POST /api/seed': 'Seed all dummy data',
        'POST /api/seed/users': 'Seed users only',
        'POST /api/seed/projects': 'Seed projects only',
        'POST /api/seed/assets': 'Seed assets only',
        'DELETE /api/seed': 'Clear all data',
      },
    };
  }

  @Post()
  async seedAll() {
    const result = await this.seedService.seedAll();
    return {
      message: 'Database seeded successfully',
      created: result,
    };
  }

  @Post('users')
  async seedUsers() {
    const users = await this.seedService.seedUsers();
    return {
      message: 'Users seeded successfully',
      count: users.length,
    };
  }

  @Post('projects')
  async seedProjects() {
    const projects = await this.seedService.seedProjects();
    return {
      message: 'Projects seeded successfully',
      count: projects.length,
    };
  }

  @Post('assets')
  async seedAssets() {
    const assets = await this.seedService.seedAssets();
    return {
      message: 'Assets seeded successfully',
      count: assets.length,
    };
  }

  @Delete()
  async clearAll() {
    await this.seedService.clearAll();
    return {
      message: 'All data cleared successfully',
    };
  }
}
