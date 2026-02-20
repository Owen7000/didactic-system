-- CreateTable
CREATE TABLE "DailyRecord" (
    "dailyRecordId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "steps" INTEGER NOT NULL DEFAULT 0,
    "calories" INTEGER NOT NULL DEFAULT 0,
    "systolic" INTEGER NOT NULL DEFAULT 0,
    "diastolic" INTEGER NOT NULL DEFAULT 0,
    "bloodPressureUpdated" BOOLEAN NOT NULL DEFAULT false,
    "waterConsumption" INTEGER NOT NULL DEFAULT 0,
    "exerciseMinutes" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT -1,
    "weight" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "DailyRecord_pkey" PRIMARY KEY ("dailyRecordId")
);

-- AddForeignKey
ALTER TABLE "DailyRecord" ADD CONSTRAINT "DailyRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
