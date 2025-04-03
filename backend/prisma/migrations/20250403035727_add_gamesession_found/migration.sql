/*
  Warnings:

  - Added the required column `found` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "found" INTEGER NOT NULL;
