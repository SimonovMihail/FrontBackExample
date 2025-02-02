import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsedToken } from '@Entities/used-token.entity';
import { JWTTokenType, UsedTokenDTO } from '@DTOs/auth.dto';

@Injectable()
export class UsedTokensService {
  public constructor(
    @InjectRepository(UsedToken)
    private readonly _usedTokensRepository: Repository<UsedToken>,
  ) {}

  /**
   * Создает использованный токен в бд
   */
  async createUsedToken(usedTokenDTO: UsedTokenDTO) {
    const { userId, token, type } = usedTokenDTO;

    await this._usedTokensRepository.save({
      user: { id: userId },
      token,
      type
    });
  }

  /**
   * Добавляет токен доступа и токен обновления в таблицу использованных токенов
   */
  public async makeTokensUsed(
    accessToken: string,
    refreshToken: string,
    userId: string,
  ): Promise<void> {
    // Добавляем токены в таблицу использованных токенов
    await Promise.all([
      this.createUsedToken({
        type: JWTTokenType.ACCESS_TOKEN,
        token: accessToken,
        userId,
      }),
      this.createUsedToken({
        type: JWTTokenType.REFRESH_TOKEN,
        token: refreshToken,
        userId,
      }),
    ]);
  }

  /**
   * Проверяет, существует ли данный токен в бд
   */
  public isUsedToken(token: string): Promise<boolean> {
    return this._usedTokensRepository.exists({
      where: { token },
    })
  }
}
