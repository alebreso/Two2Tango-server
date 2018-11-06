import {
  MigrationInterface,
  QueryRunner,
  getConnection,
  createQueryBuilder
} from "typeorm";
import User from "../entities/User";

export class FillUsers1541500874573 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: "henk@mail.com",
          password: "test"
        }
      ])
      .execute();
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "name" TO "email"`
    ); // reverts things made in "up" method
  }
}
