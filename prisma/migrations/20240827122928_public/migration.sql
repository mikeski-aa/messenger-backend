/*
  Warnings:

  - You are about to drop the column `name` on the `conversation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "conversation" DROP COLUMN "name",
ADD COLUMN     "groupname" TEXT;
