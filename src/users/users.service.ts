import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/sqlite';

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

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    wrap(user).assign(attrs);
    await this.em.flush();
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    await this.em.removeAndFlush(user);
    return user;
  }
}
