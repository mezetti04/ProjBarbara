import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EntregaRepository {
  async findAll() {
    return await prisma.entrega.findMany({
      include: {
        veiculo: true,      // incluir dados do veículo
        relatorio: true,    // incluir dados do relatório
      },
    });
  }

  async findById(id: number) {
    return await prisma.entrega.findUnique({
      where: { id },
      include: {
        veiculo: true,
        relatorio: true,
      },
    });
  }

  async create(data: any) {
    // espera que veiculoId esteja presente em data
    if (!data.veiculoId) {
      throw new Error('veiculoId é obrigatório para criar uma entrega.');
    }

    if (data.dataSaida) {
      data.dataSaida = new Date(data.dataSaida);
    }

    return await prisma.entrega.create({
      data: {
        cidadeDestino: data.cidadeDestino,
        quilometragem: data.quilometragem,
        status: data.status,
        dataSaida: data.dataSaida,
        veiculoId: data.veiculoId, // relacionamento via FK
        relatorioId: data.relatorioId || null,
      },
      include: {
        veiculo: true,
        relatorio: true,
      },
    });
  }

  async update(id: number, data: any) {
    if (data.dataSaida) {
      data.dataSaida = new Date(data.dataSaida);
    }

    return await prisma.entrega.update({
      where: { id },
      data,
      include: {
        veiculo: true,
        relatorio: true,
      },
    });
  }

  async delete(id: number) {
    return await prisma.entrega.delete({
      where: { id },
    });
  }
}
