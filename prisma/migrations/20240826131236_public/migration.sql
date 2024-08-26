/*
  Warnings:

  - You are about to drop the `converastion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_convoId_fkey";

-- DropTable
DROP TABLE "converastion";

-- CreateTable
CREATE TABLE "conversation" (
    "id" SERIAL NOT NULL,
    "participants" INTEGER[],

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversation_participants_key" ON "conversation"("participants");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_convoId_fkey" FOREIGN KEY ("convoId") REFERENCES "conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
