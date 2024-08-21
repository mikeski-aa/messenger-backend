/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "reqstat" ADD VALUE 'completed';

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
