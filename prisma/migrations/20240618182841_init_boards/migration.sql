/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- -- DropTable
-- DROP TABLE "Book";

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
