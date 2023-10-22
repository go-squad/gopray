-- CreateEnum
CREATE TYPE "Audience" AS ENUM ('CELL', 'CHURCH', 'ONLY_ME', 'MY_SUPERVISION');

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "audience" "Audience" NOT NULL DEFAULT 'CELL';
