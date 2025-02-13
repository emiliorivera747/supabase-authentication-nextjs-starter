/*
  Warnings:

  - You are about to drop the column `last_sign_in` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_sign_in",
ADD COLUMN     "last_sign_in_at" TIMESTAMP(3);
