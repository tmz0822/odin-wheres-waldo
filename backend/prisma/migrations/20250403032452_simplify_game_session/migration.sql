/*
  Warnings:

  - You are about to drop the column `endTime` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `found` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `GameSession` table. All the data in the column will be lost.
  - Added the required column `time` to the `GameSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "endTime",
DROP COLUMN "found",
DROP COLUMN "startTime",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
