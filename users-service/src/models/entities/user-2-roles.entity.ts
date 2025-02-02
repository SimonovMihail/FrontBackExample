import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Role } from '@Entities/role.entity';
import { User } from '@Entities/user.entity';

/**
 * Модель связка пользователя с ролями
 */
@Entity('user_2_roles')
export class User2Roles {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @ManyToOne(() => User, (user) => user.user2roles, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Role, (role) => role.user2roles, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  public role: Role;
}
