import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1737990686377 implements MigrationInterface {
    name = 'FirstMigration1737990686377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subject_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`levelId\` int NULL, UNIQUE INDEX \`REL_1380fa88fa7bb134c30d8c083b\` (\`levelId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`level_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subject_entity\` ADD CONSTRAINT \`FK_1380fa88fa7bb134c30d8c083b9\` FOREIGN KEY (\`levelId\`) REFERENCES \`level_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subject_entity\` DROP FOREIGN KEY \`FK_1380fa88fa7bb134c30d8c083b9\``);
        await queryRunner.query(`DROP TABLE \`level_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_1380fa88fa7bb134c30d8c083b\` ON \`subject_entity\``);
        await queryRunner.query(`DROP TABLE \`subject_entity\``);
    }

}
