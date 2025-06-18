// src/repositories/veiculo.repository.ts

import { PrismaClient, Veiculo } from '@prisma/client';
import argon2 from 'argon2'; // Importa o argon2 para hash de senha

const prisma = new PrismaClient();

export class VeiculoRepository {
  async create(data: Omit<Veiculo, 'id'>): Promise<Omit<Veiculo, 'senha'>> {
    // Faz o hash da senha antes de salvar
    if (data.senha) {
      data.senha = await argon2.hash(data.senha);
    }

    const veiculo = await prisma.veiculo.create({ data });
    delete (veiculo as { senha?: string }).senha; // Remove a senha do retorno
    return veiculo;
  }

  async findAll(): Promise<Omit<Veiculo, 'senha'>[]> {
    const veiculos = await prisma.veiculo.findMany();
    return veiculos.map((veiculo) => {
      delete (veiculo as { senha?: string }).senha; // Remove a senha de cada veículo
      return veiculo;
    });
  }

  async findById(id: number): Promise<Omit<Veiculo, 'senha'> | null> {
    const veiculo = await prisma.veiculo.findUnique({
      where: { id },
    });
    if (veiculo) {
      delete (veiculo as { senha?: string }).senha; // Remove a senha do retorno
    }
    return veiculo;
  }

  async update(id: number, data: Partial<Omit<Veiculo, 'id'>>): Promise<Omit<Veiculo, 'senha'>> {
    // Faz o hash da senha se ela estiver presente
    if (data.senha) {
      data.senha = await argon2.hash(data.senha);
    }

    const veiculo = await prisma.veiculo.update({
      where: { id },
      data,
    });
    delete (veiculo as { senha?: string }).senha; // Remove a senha do retorno
    return veiculo;
  }

  async delete(id: number): Promise<Omit<Veiculo, 'senha'>> {
    const veiculo = await prisma.veiculo.delete({
      where: { id },
    });
    delete (veiculo as { senha?: string }).senha; // Remove a senha do retorno
    return veiculo;
  }
}
