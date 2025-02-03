import { AnnounceEntity } from 'src/announce/entities/announce.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AnnounceEntity, (announce) => announce.level)
  @JoinColumn()
  announces: AnnounceEntity[];
}
