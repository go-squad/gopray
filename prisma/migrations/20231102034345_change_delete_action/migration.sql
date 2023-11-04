-- DropForeignKey
ALTER TABLE "RequestPray" DROP CONSTRAINT "RequestPray_requestId_fkey";

-- AddForeignKey
ALTER TABLE "RequestPray" ADD CONSTRAINT "RequestPray_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
