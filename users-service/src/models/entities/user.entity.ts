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
}
