// src/controllers/EntregaController.ts
import { Request, Response } from 'express';
import { EntregaRepository } from '../repositories/EntregaRepository';

const entregaRepository = new EntregaRepository();

export class EntregaController {
  getAll = async (req: Request, res: Response) => {
    try {
      const entregas = await entregaRepository.findAll();
      res.json(entregas);
    } catch (error) {
      console.error('Erro ao buscar entregas:', error);
      res.status(500).json({ error: 'Erro ao buscar entregas' });
    }
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const entrega = await entregaRepository.findById(id);
      if (!entrega) {
        return res.status(404).json({ error: 'Entrega não encontrada' });
      }
      res.json(entrega);
    } catch (error) {
      console.error('Erro ao buscar entrega:', error);
      res.status(500).json({ error: 'Erro ao buscar entrega' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { cidadeDestino, quilometragem, status, dataSaida, veiculoId, relatorioId } = req.body;

      if (!cidadeDestino || !quilometragem || !status || !dataSaida || !veiculoId) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const novaEntrega = await entregaRepository.create({
        cidadeDestino,
        quilometragem,
        status,
        dataSaida,
        veiculoId,
        relatorioId,
      });

      res.status(201).json(novaEntrega);
    } catch (error) {
      console.error('Erro ao criar entrega:', error);
      res.status(500).json({ error: 'Erro ao criar entrega.' });
    }
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const { cidadeDestino, quilometragem, status, dataSaida, veiculoId, relatorioId } = req.body;

      const entregaAtualizada = await entregaRepository.update(id, {
        cidadeDestino,
        quilometragem,
        status,
        dataSaida,
        veiculoId,
        relatorioId,
      });

      res.json(entregaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar entrega:', error);
      res.status(500).json({ error: 'Erro ao atualizar entrega.' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      await entregaRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar entrega:', error);
      res.status(500).json({ error: 'Erro ao deletar entrega.' });
    }
  };
}
