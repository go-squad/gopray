/*
  Warnings:

  - Made the column `churchId` on table `Cell` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cellId` on table `Request` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_churchId_fkey";

-- AlterTable
ALTER TABLE "Cell" ALTER COLUMN "churchId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "churchId" TEXT NOT NULL DEFAULT 'idigrejaoceanica',
ALTER COLUMN "cellId" SET NOT NULL,
ALTER COLUMN "cellId" SET DEFAULT 'newcell128';

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
