/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserGoal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserGoal" ALTER COLUMN "userId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "UserGoal_userId_key" ON "UserGoal"("userId");
