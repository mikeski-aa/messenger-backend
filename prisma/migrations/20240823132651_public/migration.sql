/*
  Warnings:

  - A unique constraint covering the columns `[participants]` on the table `converastion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "converastion_participants_key" ON "converastion"("participants");
