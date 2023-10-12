-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(30) NOT NULL,
    `userPassword` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(150) NOT NULL,
    `userFullName` VARCHAR(100) NOT NULL,
    `userGroupCode` VARCHAR(15) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastSucessfulLogin` DATETIME(3) NULL,
    `isLocked` BOOLEAN NOT NULL DEFAULT false,
    `noAttempt` INTEGER NOT NULL DEFAULT 0,
    `lockDate` DATETIME(3) NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(30) NOT NULL,
    `editedOn` DATETIME(3) NOT NULL,
    `editedBy` VARCHAR(30) NULL DEFAULT '',

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userGroupCode` VARCHAR(15) NOT NULL,
    `userGroupDescription` VARCHAR(100) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(30) NOT NULL,
    `editedOn` DATETIME(3) NOT NULL,
    `editedBy` VARCHAR(30) NULL DEFAULT '',

    UNIQUE INDEX `UserGroup_userGroupCode_key`(`userGroupCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deptCode` VARCHAR(15) NOT NULL,
    `deptName` VARCHAR(100) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(30) NOT NULL,
    `editedOn` DATETIME(3) NOT NULL,
    `editedBy` VARCHAR(30) NULL DEFAULT '',

    UNIQUE INDEX `Department_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empNo` VARCHAR(15) NOT NULL,
    `empName` VARCHAR(100) NOT NULL,
    `deptId` INTEGER NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(30) NOT NULL,
    `editedOn` DATETIME(3) NOT NULL,
    `editedBy` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Employee_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userGroupCode_fkey` FOREIGN KEY (`userGroupCode`) REFERENCES `UserGroup`(`userGroupCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
