/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Connection } from 'typeorm';
import createConnection from '../database/index';
import 'dotenv/config';

class DropDatabase {
  public static async run(): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      const connection = await createConnection();
      console.log('\n== [Database connection] ==');

      await this.queryDropTables(connection);
      console.log('\n== DROP TABLES SUCESSFULLY ==');

      await connection.close();
      console.log('\n== CONNECTION DATABASE CLOSE ==\n');
    }
    else {
      console.log('Environment variable must be test');
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

DropDatabase.run();
