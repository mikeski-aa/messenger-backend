/*
  Warnings:

  - You are about to drop the column `ownerId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "ownerId",
DROP COLUMN "targetId",
ADD COLUMN     "author" INTEGER[],
ADD COLUMN     "participants" INTEGER[];
