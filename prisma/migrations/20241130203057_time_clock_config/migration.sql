-- CreateTable
CREATE TABLE "TimeClock" (
    "id" SERIAL NOT NULL,
    "hourStart" TIMESTAMP(3) NOT NULL,
    "hourEnd" TIMESTAMP(3) NOT NULL,
    "ValueDay" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "TimeClock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeClock" ADD CONSTRAINT "TimeClock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeClock" ADD CONSTRAINT "TimeClock_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
