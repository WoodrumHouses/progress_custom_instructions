import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';

export enum AssetType {
  RULESHEET = 'rulesheet',
  RULEFLOW = 'ruleflow',
  VOCABULARY = 'vocabulary',
  DECISIONSERVICE = 'decisionservice',
}

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    default: AssetType.RULESHEET,
  })
  type: AssetType;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.assets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
