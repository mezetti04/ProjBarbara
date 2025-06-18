import { Router } from 'express';
import { loginController } from '../controllers/auth.controller'; 

const router = Router();

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
router.post('/login', loginController);

export default router;
