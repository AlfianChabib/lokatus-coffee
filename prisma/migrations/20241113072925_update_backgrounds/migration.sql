/*
  Warnings:

  - The primary key for the `backgrounds` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "backgrounds" DROP CONSTRAINT "backgrounds_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "backgrounds_id_seq";
