/*
  Warnings:

  - The primary key for the `SavedPrayers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SavedPrayers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SavedPrayers_userId_requestId_key";

-- AlterTable
ALTER TABLE "SavedPrayers" DROP CONSTRAINT "SavedPrayers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SavedPrayers_pkey" PRIMARY KEY ("userId", "requestId");
