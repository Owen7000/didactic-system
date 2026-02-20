/*
  Warnings:

  - Added the required column `clinicianId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datetime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "clinicianId" INTEGER NOT NULL,
ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "purpose" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "Clinician"("clinicianId") ON DELETE RESTRICT ON UPDATE CASCADE;
