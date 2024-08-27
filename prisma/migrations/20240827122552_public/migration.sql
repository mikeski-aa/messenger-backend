/*
  Warnings:

  - Made the column `name` on table `conversation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "conversation" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;
