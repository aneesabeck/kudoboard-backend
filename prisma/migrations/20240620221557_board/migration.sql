/*
  Warnings:

  - You are about to drop the column `caption` on the `Board` table. All the data in the column will be lost.
  - Added the required column `author` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "caption",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
