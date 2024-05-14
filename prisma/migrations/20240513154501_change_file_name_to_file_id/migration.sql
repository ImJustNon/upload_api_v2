/*
  Warnings:

  - You are about to drop the column `file_name` on the `fileinfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[file_id]` on the table `FileInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_id` to the `FileInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `FileInfo_file_name_key` ON `fileinfo`;

-- AlterTable
ALTER TABLE `fileinfo` DROP COLUMN `file_name`,
    ADD COLUMN `file_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `FileInfo_file_id_key` ON `FileInfo`(`file_id`);
