-- AlterTable
ALTER TABLE "conversation" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'DM';
