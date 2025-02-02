import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@Entities/user.entity';
import { JWTTokenType } from '@DTOs/auth.dto';

/**
 * Модель использованного токена в бд
 */
@Entity('used_tokens')
export class UsedToken {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @ManyToOne(() => User, (user) => user.usedTokens, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
  public token: string;

  @Column({ type: 'enum', enum: JWTTokenType, nullable: false })
  public type: JWTTokenType;

  @CreateDateColumn({ name: 'added_at', type: 'timestamptz' })
  public addedAt: Date | string;
}
