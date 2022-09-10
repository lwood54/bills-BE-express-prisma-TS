/*
  Warnings:

  - Made the column `userId` on table `BillCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BillCategory" DROP CONSTRAINT "BillCategory_userId_fkey";

-- AlterTable
ALTER TABLE "BillCategory" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BillCategory" ADD CONSTRAINT "BillCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
