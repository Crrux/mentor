import { IsOptional, IsString } from 'class-validator';

export class SeachQuery {
  @IsOptional()
  @IsString()
  levelName: string;

  @IsOptional()
  @IsString()
  subjectName: string;
}
