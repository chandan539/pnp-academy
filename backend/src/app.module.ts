import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { WorkflowModule } from './workflow/workflow.module';
import { TasksModule } from './tasks/tasks.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [PrismaModule, AuthModule, AuthorsModule, WorkflowModule, TasksModule, IntegrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
