/*
  Warnings:

  - The values [completed] on the enum `reqstat` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "reqstat_new" AS ENUM ('pending');
ALTER TABLE "reqstatus" ALTER COLUMN "status" TYPE "reqstat_new" USING ("status"::text::"reqstat_new");
ALTER TYPE "reqstat" RENAME TO "reqstat_old";
ALTER TYPE "reqstat_new" RENAME TO "reqstat";
DROP TYPE "reqstat_old";
COMMIT;

-- AlterTable
ALTER TABLE "reqstatus" ADD COLUMN     "reqdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
