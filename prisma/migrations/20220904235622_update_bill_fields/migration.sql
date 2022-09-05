/*
  Warnings:

  - You are about to drop the column `limit` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `paymentAmount` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "limit",
DROP COLUMN "payment",
ADD COLUMN     "creditLimit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "paymentAmount" DOUBLE PRECISION NOT NULL;
