-- CreateEnum
CREATE TYPE "reqstat" AS ENUM ('pending');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'online';

-- CreateTable
CREATE TABLE "reqstatus" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "status" "reqstat" NOT NULL,

    CONSTRAINT "reqstatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reqstatus" ADD CONSTRAINT "reqstatus_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
