/*
  Warnings:

  - The `status` column on the `quote_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QuoteRequestStatus" AS ENUM ('PENDING', 'REQUESTED');

-- AlterTable
ALTER TABLE "quote_requests" DROP COLUMN "status",
ADD COLUMN     "status" "QuoteRequestStatus" NOT NULL DEFAULT 'PENDING';
