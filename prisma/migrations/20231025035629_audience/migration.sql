/*
  Warnings:

  - You are about to drop the column `audience` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "audience";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "audience" "Audience" NOT NULL DEFAULT 'CELL';
