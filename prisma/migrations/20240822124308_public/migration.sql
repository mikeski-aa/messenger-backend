-- DropForeignKey
ALTER TABLE "reqstatus" DROP CONSTRAINT "reqstatus_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "reqstatus" ADD CONSTRAINT "reqstatus_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
