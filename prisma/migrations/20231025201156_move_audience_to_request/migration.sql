/*
  Warnings:

  - You are about to drop the column `audience` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "audience" "Audience" NOT NULL DEFAULT 'CELL';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "audience";
