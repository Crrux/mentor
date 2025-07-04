import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceModule } from './announce/announce.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { typeOrmModuleOptions } from './ormconfig';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    SubjectModule,
    LevelModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    CacheModule.register({ ttl: 3600 }),
    AnnounceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
