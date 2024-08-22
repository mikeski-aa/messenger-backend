-- AddForeignKey
ALTER TABLE "reqstatus" ADD CONSTRAINT "reqstatus_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
