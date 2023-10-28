-- CreateTable
CREATE TABLE "SavedPrayers" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedPrayers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedPrayers_userId_requestId_key" ON "SavedPrayers"("userId", "requestId");

-- AddForeignKey
ALTER TABLE "SavedPrayers" ADD CONSTRAINT "SavedPrayers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPrayers" ADD CONSTRAINT "SavedPrayers_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
