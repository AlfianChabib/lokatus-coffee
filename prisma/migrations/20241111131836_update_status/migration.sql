-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REQUESTED', 'APPROVED');

-- AlterTable
ALTER TABLE "quotes" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'REQUESTED';
