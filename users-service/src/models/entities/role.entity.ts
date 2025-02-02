import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { UserRoleEnum } from '@DTOs/users.dto';
import { User2Roles } from '@Entities/user-2-roles.entity';

/**
 * Модель ролей в бд
 */
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'enum', enum: UserRoleEnum, nullable: false })
  public name: UserRoleEnum;

  @OneToMany(() => User2Roles, (relation) => relation.role)
  public user2roles: User2Roles[]

  @CreateDateColumn({ name: 'added_at', type: 'timestamptz' })
  public addedAt: Date | string;
}
