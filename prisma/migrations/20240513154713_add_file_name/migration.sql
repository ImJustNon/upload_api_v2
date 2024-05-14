/*
  Warnings:

  - Added the required column `file_name` to the `FileInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fileinfo` ADD COLUMN `file_name` VARCHAR(191) NOT NULL;
