/*
  Warnings:

  - Added the required column `name` to the `backgrounds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "backgrounds" ADD COLUMN     "name" TEXT NOT NULL;
