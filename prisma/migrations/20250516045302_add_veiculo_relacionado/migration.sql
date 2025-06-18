/*
  Warnings:

  - The primary key for the `Veiculo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `veiculoId` to the `Entrega` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "veiculoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
