import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1603401010527 implements MigrationInterface {
    name = 'Init1603401010527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "shortBio" varchar NOT NULL, "isVerified" boolean NOT NULL DEFAULT (0))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
