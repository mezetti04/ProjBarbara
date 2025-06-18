// src/controllers/VeiculoController.ts
import { Request, Response } from 'express';
import { VeiculoRepository } from '../repositories/VeiculoRepository';

const veiculoRepository = new VeiculoRepository();

export class VeiculoController {
  getAll = async (req: Request, res: Response) => {
    try {
      const veiculos = await veiculoRepository.findAll();
      res.json(veiculos);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const veiculo = await veiculoRepository.findById(id);
      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
      }
      res.json(veiculo);
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
      res.status(500).json({ error: 'Erro ao buscar veículo' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const veiculo = await veiculoRepository.create(req.body);
      res.status(201).json(veiculo);
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      res.status(500).json({ error: 'Erro ao criar veículo' });
    }
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const veiculo = await veiculoRepository.update(id, req.body);
      res.json(veiculo);
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      res.status(500).json({ error: 'Erro ao atualizar veículo' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      await veiculoRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar veículo:', error);
      res.status(500).json({ error: 'Erro ao deletar veículo' });
    }
  };
}
