/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Connection } from 'typeorm';
import { DataSeed } from '../database/seeders/DataSeed';
import createConnection from '../database/index';
import 'dotenv/config';

class SeederRun {
  public static async run() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      try {
        const connection = await createConnection();
        console.log('\n== [Database connection] ==');

        const entitiesExists = await DataSeed.verifyEntities();
        if (entitiesExists) {
          console.log('\n== Database is already populated ==\n');

          await this.queryDropTables(connection);
          console.log('== Database initialized ==\n');
        }

        await connection.runMigrations();
        console.log('\n== [Migrations run sucessfully] ==');

        await DataSeed.createUsers();
        console.log('\n== [Seeders run successfully] ==');

        await connection.close();
        console.log('\n== [Connection database close] ==\n');
      } catch (error) {
        console.log('\nError:', error);
      }
    } else {
      console.log('Seeders should only be run in local environments');
    }
  }

  private static async queryDropTables(connection: Connection): Promise<void> {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    const listTables: { table_name: string }[] = await connection.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = '${process.env.BD_DATABASE_TEST}'`,
    );
    const listTableNames = listTables.map(table => table.table_name);

    for (const table of listTableNames) {
      await connection.query(`DROP TABLE ${process.env.BD_DATABASE_TEST}.${table}`);
      console.log(` * drop table: ${table}`);
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

SeederRun.run();
