-- CreateTable
CREATE TABLE `categories` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organisations` (
    `oid` INTEGER NOT NULL AUTO_INCREMENT,
    `organisation_name` VARCHAR(191) NOT NULL,
    `organisation_address` VARCHAR(191) NOT NULL,
    `organisation_email` VARCHAR(191) NOT NULL,
    `organisation_phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `organisations_organisation_email_key`(`organisation_email`),
    PRIMARY KEY (`oid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_organisations` (
    `cat_id` INTEGER NOT NULL,
    `oid` INTEGER NOT NULL,

    PRIMARY KEY (`cat_id`, `oid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `problems` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `position` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `cat_id` INTEGER NOT NULL,
    `uid` INTEGER NOT NULL,
    `image` VARCHAR(400) NOT NULL,
    `pinata_id` VARCHAR(400) NOT NULL DEFAULT '',

    INDEX `problems_cat_id_fkey`(`cat_id`),
    INDEX `problems_uid_fkey`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `role` VARCHAR(191) NOT NULL,
    `verificationToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_verificationToken_key`(`verificationToken`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appName` VARCHAR(191) NOT NULL,
    `appArea` VARCHAR(191) NULL,
    `initialZoom` INTEGER NOT NULL,
    `defaultPosition` JSON NOT NULL,
    `centerPosition` JSON NOT NULL,
    `defaultBound` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryOrganisations` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryOrganisations_AB_unique`(`A`, `B`),
    INDEX `_CategoryOrganisations_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category_organisations` ADD CONSTRAINT `category_organisations_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `categories`(`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_organisations` ADD CONSTRAINT `category_organisations_oid_fkey` FOREIGN KEY (`oid`) REFERENCES `organisations`(`oid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `categories`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryOrganisations` ADD CONSTRAINT `_CategoryOrganisations_A_fkey` FOREIGN KEY (`A`) REFERENCES `organisations`(`oid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryOrganisations` ADD CONSTRAINT `_CategoryOrganisations_B_fkey` FOREIGN KEY (`B`) REFERENCES `categories`(`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;
