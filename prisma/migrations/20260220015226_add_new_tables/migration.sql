-- CreateTable
CREATE TABLE "Clinician" (
    "clinicianId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Clinician_pkey" PRIMARY KEY ("clinicianId")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "appointmentId" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateTable
CREATE TABLE "UserGoal" (
    "userGoalId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 0,
    "stepsGoal" INTEGER NOT NULL DEFAULT 0,
    "caloriesGoal" INTEGER NOT NULL DEFAULT 0,
    "waterGoal" INTEGER NOT NULL DEFAULT 0,
    "exerciseGoal" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("userGoalId")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
