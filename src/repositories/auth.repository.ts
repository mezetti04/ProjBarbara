import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findVeiculoById = async (id: number) => {
    const veiculo = await prisma.veiculo.findUnique({
        where: { id },
      })
    return veiculo;
  };
      
