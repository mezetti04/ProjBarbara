import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import * as authRepository from '../repositories/auth.repository';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um veículo
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - senha
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do veículo
 *               senha:
 *                 type: string
 *                 description: Senha do veículo
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso!
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado
 *       400:
 *         description: ID ou senha não fornecidos
 *       401:
 *         description: Usuário não encontrado ou senha inválida
 *       500:
 *         description: Erro interno do servidor
 */
export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { id, senha } = req.body;

  if (!id || !senha) {
    res.status(400).json({ message: 'ID e senha são obrigatórios.' });
    return;
  }

  const veiculo = await authRepository.findVeiculoById(id);
  if (!veiculo) {
    res.status(401).json({ message: 'Usuário não encontrado.' });
    return;
  }

  const senhaValida = await argon2.verify(veiculo.senha, senha);
  if (!senhaValida) {
    res.status(401).json({ message: 'Senha inválida.' });
    return;
  }

  const token = jwt.sign(
    { id: veiculo.id, placa: veiculo.placa },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login realizado com sucesso!', token });
};
