/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_id_userId_key" ON "Movie"("id", "userId");
