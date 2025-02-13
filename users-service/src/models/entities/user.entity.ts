import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { User2Roles } from '@Entities/user-2-roles.entity';
import { UsedToken } from '@Entities/used-token.entity';

/**
 * Модель пользователя в бд
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
  public email: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: true })
  public fullName: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  public password: string;

  @OneToMany(() => User2Roles, (relation) => relation.user)
  public user2roles: User2Roles[]

  @OneToMany(() => UsedToken, (relation) => relation.user)
  public usedTokens: UsedToken[]

  @CreateDateColumn({ name: 'registered_at', type: 'timestamptz' })
  public registeredAt: Date | string;

  @Column({ name: 'work_grade', type: 'varchar', length: 255, nullable: true })
  public work_grade: string;

  @Column({ name: 'number', type: 'varchar', length: 255, nullable: true })
  public number: string;

  @Column({ name: 'vuz', type: 'varchar', length: 255, nullable: true })
  public vuz: string;

  @Column({ name: 'vuz_direction', type: 'varchar', length: 255, nullable: true })
  public vuz_direction: string;

  @Column({ name: 'code_speciality', type: 'varchar', length: 255, nullable: true })
  public code_speciality: string;

  @Column({ name: 'course', type: 'varchar', length: 255, nullable: true })
  public course: string;

  @Column({ name: 'education_degree', type: 'varchar', length: 255, nullable: true })
  public education_degree: string;

  @Column({ name: 'team_name', type: 'varchar', length: 255, nullable: true })
  public team_name: string;

  @Column({ name: 'team_motto', type: 'varchar', length: 255, nullable: true })
  public team_motto: string;

  @Column({ name: 'entry_sent', type: 'varchar', length: 255, nullable: true })
  public entry_sent: boolean;

  @Column({ name: 'work_sent', type: 'varchar', length: 255, nullable: true })
  public work_sent: boolean;

  @Column({ name: 'user_valid', type: 'varchar', length: 255, nullable: true })
  public user_valid: boolean;

  @Column({ name: 'team_valid', type: 'varchar', length: 255, nullable: true })
  public team_valid: boolean;

  @Column({ name: 'team_member_1_id', type: 'varchar', length: 255, nullable: true })
  public team_member_1_id: string;

  @Column({ name: 'team_member_2_id', type: 'varchar', length: 255, nullable: true })
  public team_member_2_id: string;

  @Column({ name: 'team_member_3_id', type: 'varchar', length: 255, nullable: true })
  public team_member_3_id: string;

  @Column({ name: 'team_member_4_id', type: 'varchar', length: 255, nullable: true })
  public team_member_4_id: string;

  @Column({ name: 'mentor_id', type: 'varchar', length: 255, nullable: true })
  public mentor_id: string;
}
