import { defineConfig } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Utils } from '@mikro-orm/sqlite';

export default defineConfig({
  dbName: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: Utils.detectTsNode() ? 'src/migrations' : 'dist/migrations',
    transactional: true,
    allOrNothing: true,
    dropTables: true,
    disableForeignKeys: true,
  },
});
