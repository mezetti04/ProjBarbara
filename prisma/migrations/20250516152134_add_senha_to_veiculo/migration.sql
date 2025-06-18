/*
  Warnings:

  - A unique constraint covering the columns `[renav]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Veiculo" ALTER COLUMN "senha" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_renav_key" ON "Veiculo"("renav");
