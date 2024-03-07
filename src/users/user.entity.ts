import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { t } from '@mikro-orm/core';
import { uuid } from 'uuidv4';

@Entity()
export class User {
  @PrimaryKey({ type: t.uuid })
  id: string = uuid();

  @Property()
  email: string;

  @Property()
  password: string;
}
