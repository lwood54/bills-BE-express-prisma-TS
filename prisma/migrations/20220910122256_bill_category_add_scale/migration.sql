-- CreateEnum
CREATE TYPE "Scale" AS ENUM ('ESSENTIAL', 'NEUTRAL', 'NON_ESSENTIAL');

-- AlterTable
ALTER TABLE "BillCategory" ADD COLUMN     "scale" "Scale" NOT NULL DEFAULT 'NEUTRAL';
