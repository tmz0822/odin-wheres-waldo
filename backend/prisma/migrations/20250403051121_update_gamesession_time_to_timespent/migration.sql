/*
  Warnings:

  - You are about to drop the column `time` on the `GameSession` table. All the data in the column will be lost.
  - Added the required column `timeSpent` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "time",
ADD COLUMN     "timeSpent" DOUBLE PRECISION NOT NULL;
