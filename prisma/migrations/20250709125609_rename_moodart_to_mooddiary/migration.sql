/*
  Warnings:

  - You are about to drop the `MoodArt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MoodArt` DROP FOREIGN KEY `MoodArt_userId_fkey`;

-- DropForeignKey
ALTER TABLE `MoodTrigger` DROP FOREIGN KEY `MoodTrigger_moodArtId_fkey`;

-- DropIndex
DROP INDEX `MoodTrigger_moodArtId_fkey` ON `MoodTrigger`;

-- DropTable
DROP TABLE `MoodArt`;

-- CreateTable
CREATE TABLE `MoodDiary` (
    `id` VARCHAR(191) NOT NULL,
    `moodColor` ENUM('ANGRY', 'ANXIOUS', 'CALM', 'EXCITED', 'GRATEFUL', 'HOPEFUL', 'LOVED', 'RELAXED', 'SAD', 'STRESSED', 'TIRED') NOT NULL,
    `title` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,
    `day` DATE NOT NULL,
    `challengingThought` VARCHAR(191) NULL,
    `alternativeThought` VARCHAR(191) NULL,
    `copingStrategyUsed` VARCHAR(191) NULL,
    `lessonLearned` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MoodDiary` ADD CONSTRAINT `MoodDiary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoodTrigger` ADD CONSTRAINT `MoodTrigger_moodArtId_fkey` FOREIGN KEY (`moodArtId`) REFERENCES `MoodDiary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
