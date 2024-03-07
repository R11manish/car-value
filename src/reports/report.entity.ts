import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { t } from '@mikro-orm/core';

@Entity()
export class Report {
  @PrimaryKey({ type: t.uuid })
  id: number;

  @Property()
  price: number;
}
