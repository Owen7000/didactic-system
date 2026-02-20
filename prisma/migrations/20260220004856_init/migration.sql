-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "pwHash" TEXT NOT NULL,
    "hasGivenConsent" BOOLEAN NOT NULL DEFAULT false,
    "fcmKey" VARCHAR(4096) NOT NULL,
    "age" INTEGER NOT NULL,
    "biologicalSex" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");
