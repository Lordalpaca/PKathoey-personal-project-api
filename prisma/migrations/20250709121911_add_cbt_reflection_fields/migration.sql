-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionTag` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `tag` ENUM('CHAT', 'CBTEXERCISE', 'MOODDIARY') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatLog` (
    `id` VARCHAR(191) NOT NULL,
    `sender` ENUM('USER', 'PKATHOEY') NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MoodArt` (
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

-- CreateTable
CREATE TABLE `MoodTrigger` (
    `id` VARCHAR(191) NOT NULL,
    `tag` ENUM('FAMILY', 'NEWS', 'HEALTH', 'WORK', 'FRIENDS', 'PARTICIPATION', 'SELF', 'RELATIONSHIPS', 'ACTIVITIES', 'INDEPENDENCE') NOT NULL,
    `moodArtId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Streak` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `daysCount` INTEGER NOT NULL,
    `dayMood` VARCHAR(191) NOT NULL,
    `moodColor` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionTag` ADD CONSTRAINT `SessionTag_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatLog` ADD CONSTRAINT `ChatLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoodArt` ADD CONSTRAINT `MoodArt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoodTrigger` ADD CONSTRAINT `MoodTrigger_moodArtId_fkey` FOREIGN KEY (`moodArtId`) REFERENCES `MoodArt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Streak` ADD CONSTRAINT `Streak_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
