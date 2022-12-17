/*
  Warnings:

  - You are about to drop the column `billCategoryId` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `creditLimit` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `interestRate` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `paymentAmount` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the `BillCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_billCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "BillCategory" DROP CONSTRAINT "BillCategory_userId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "billCategoryId",
DROP COLUMN "creditLimit",
DROP COLUMN "interestRate",
DROP COLUMN "paymentAmount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "limit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "BillCategory";

-- CreateTable
CREATE TABLE "SpendingCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SpendingCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendingLog" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "scale" "Scale" NOT NULL DEFAULT 'NEUTRAL',
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spendingCategoryId" TEXT NOT NULL,

    CONSTRAINT "SpendingLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "SpendingCategory" ADD CONSTRAINT "SpendingCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingLog" ADD CONSTRAINT "SpendingLog_spendingCategoryId_fkey" FOREIGN KEY ("spendingCategoryId") REFERENCES "SpendingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingLog" ADD CONSTRAINT "SpendingLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
