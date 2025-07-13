/*
  Warnings:

  - You are about to drop the column `moodArtId` on the `MoodTrigger` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tag]` on the table `MoodTrigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `MoodDiary` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `MoodDiary` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `MoodDiary` DROP FOREIGN KEY `MoodDiary_userId_fkey`;

-- DropForeignKey
ALTER TABLE `MoodTrigger` DROP FOREIGN KEY `MoodTrigger_moodArtId_fkey`;

-- DropIndex
DROP INDEX `MoodDiary_userId_fkey` ON `MoodDiary`;

-- DropIndex
DROP INDEX `MoodTrigger_moodArtId_fkey` ON `MoodTrigger`;

-- AlterTable
ALTER TABLE `MoodDiary` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `moodColor` ENUM('ANGRY', 'ANXIOUS', 'CALM', 'EXCITED', 'GRATEFUL', 'HOPEFUL', 'LOVED', 'RELAXED', 'SAD', 'STRESSED', 'TIRED', 'HAPPY') NOT NULL,
    MODIFY `day` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MoodTrigger` DROP COLUMN `moodArtId`;

-- CreateTable
CREATE TABLE `_MoodDiaryToMoodTrigger` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MoodDiaryToMoodTrigger_AB_unique`(`A`, `B`),
    INDEX `_MoodDiaryToMoodTrigger_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `MoodTrigger_tag_key` ON `MoodTrigger`(`tag`);

-- AddForeignKey
ALTER TABLE `MoodDiary` ADD CONSTRAINT `MoodDiary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoodDiaryToMoodTrigger` ADD CONSTRAINT `_MoodDiaryToMoodTrigger_A_fkey` FOREIGN KEY (`A`) REFERENCES `MoodDiary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoodDiaryToMoodTrigger` ADD CONSTRAINT `_MoodDiaryToMoodTrigger_B_fkey` FOREIGN KEY (`B`) REFERENCES `MoodTrigger`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
