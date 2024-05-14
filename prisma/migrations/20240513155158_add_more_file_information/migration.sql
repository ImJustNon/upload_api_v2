/*
  Warnings:

  - Added the required column `channel_id` to the `FileInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_content_type` to the `FileInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_size` to the `FileInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message_id` to the `FileInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fileinfo` ADD COLUMN `channel_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `file_content_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `file_size` VARCHAR(191) NOT NULL,
    ADD COLUMN `message_id` VARCHAR(191) NOT NULL;
