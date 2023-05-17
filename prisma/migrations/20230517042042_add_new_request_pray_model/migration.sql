-- CreateTable
CREATE TABLE "RequestPray" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "RequestPray_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestPray_userId_requestId_key" ON "RequestPray"("userId", "requestId");

-- AddForeignKey
ALTER TABLE "RequestPray" ADD CONSTRAINT "RequestPray_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestPray" ADD CONSTRAINT "RequestPray_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
