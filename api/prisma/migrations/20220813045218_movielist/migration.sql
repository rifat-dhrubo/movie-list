/*
  Warnings:

  - Added the required column `rating` to the `MovieList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieList" ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "watchLink" TEXT,
ALTER COLUMN "imdbLink" DROP NOT NULL,
ALTER COLUMN "imageLink" DROP NOT NULL;
