import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { LevelEntity } from './level/entities/level.entity';
import { SubjectEntity } from './subject/entities/subject.entity';

const options: DataSourceOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'mentor',
  entities: [SubjectEntity, LevelEntity],
  migrations: ['./dist/migration/*{.ts,.js}'],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: false,
};

export const connectionSource = new DataSource(options);
