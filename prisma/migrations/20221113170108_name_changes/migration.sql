/*
  Warnings:

  - You are about to drop the `SpendingCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpendingLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SpendingCategory" DROP CONSTRAINT "SpendingCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "SpendingLog" DROP CONSTRAINT "SpendingLog_spendingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SpendingLog" DROP CONSTRAINT "SpendingLog_userId_fkey";

-- DropTable
DROP TABLE "SpendingCategory";

-- DropTable
DROP TABLE "SpendingLog";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "scale" "Scale" NOT NULL DEFAULT 'NEUTRAL',
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
