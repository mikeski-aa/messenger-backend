/*
  Warnings:

  - You are about to drop the column `participants` on the `message` table. All the data in the column will be lost.
  - Added the required column `convoId` to the `message` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `author` on the `message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "participants",
ADD COLUMN     "convoId" INTEGER NOT NULL,
DROP COLUMN "author",
ADD COLUMN     "author" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "converastion" (
    "id" SERIAL NOT NULL,
    "participants" INTEGER[],

    CONSTRAINT "converastion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_convoId_fkey" FOREIGN KEY ("convoId") REFERENCES "converastion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
