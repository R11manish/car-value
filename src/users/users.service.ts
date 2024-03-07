import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.em.persistAndFlush(user);
  }
}
