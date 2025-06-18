-- CreateTable
CREATE TABLE "Entrega" (
    "id" SERIAL NOT NULL,
    "cidadeDestino" TEXT NOT NULL,
    "quilometragem" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "dataSaida" TIMESTAMP(3) NOT NULL,
    "relatorioId" INTEGER,

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "id" SERIAL NOT NULL,
    "numNota" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "cidade" TEXT NOT NULL,
    "numItens" INTEGER NOT NULL,

    CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relatorio" (
    "id" SERIAL NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFinal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Local" (
    "id" SERIAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "tipoImovel" TEXT NOT NULL,
    "custoMensal" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "valorAluguel" DOUBLE PRECISION,
    "valorImovel" DOUBLE PRECISION,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transportadora" (
    "id" SERIAL NOT NULL,
    "nomeTransp" TEXT NOT NULL,
    "cnpjTransp" TEXT NOT NULL,
    "enderecoTransp" TEXT NOT NULL,

    CONSTRAINT "Transportadora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "nomeFunc" TEXT NOT NULL,
    "cpfFunc" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "nomeFor" TEXT NOT NULL,
    "cnpjFor" TEXT NOT NULL,
    "comissao" DOUBLE PRECISION NOT NULL,
    "endereco" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "renav" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "capacidade" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("renav")
);

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "Relatorio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
