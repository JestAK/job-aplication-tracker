import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Docker Compose keeps its environment in the repository root. When Prisma is
// run locally from /backend, load that same file without duplicating secrets.
config({ path: '../.env' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
