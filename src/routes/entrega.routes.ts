// src/routes/entrega.routes.ts
import { Router } from 'express';
import { EntregaController } from '../controllers/EntregaController';

const router = Router();
const controller = new EntregaController();

/**
 * @swagger
 * tags:
 *   name: Entregas
 *   description: Gerenciamento de entregas
 */

/**
 * @swagger
 * /entregas:
 *   get:
 *     summary: Retorna todas as entregas
 *     tags: [Entregas]
 *     responses:
 *       200:
 *         description: Lista de entregas
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /entregas/{id}:
 *   get:
 *     summary: Retorna uma entrega específica
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da entrega
 *     responses:
 *       200:
 *         description: Entrega encontrada
 *       404:
 *         description: Entrega não encontrada
 */
router.get('/:id', async (req, res) => {
    try {
        await controller.getById(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar entrega' });
    }
});

/**
 * @swagger
 * /entregas:
 *   post:
 *     summary: Cria uma nova entrega
 *     tags: [Entregas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cidadeDestino
 *               - quilometragem
 *               - status
 *               - dataSaida
 *               - veiculoId
 *             properties:
 *               cidadeDestino:
 *                 type: string
 *               quilometragem:
 *                 type: number
 *               status:
 *                 type: string
 *               dataSaida:
 *                 type: string
 *                 format: date
 *               veiculoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Entrega criada com sucesso
 */
router.post('/', async (req, res) => {
    try {
       await controller.create(req, res);
        res.status(201).json({ message: 'Entrega criada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar entrega' });
    }
});

/**
 * @swagger
 * /entregas/{id}:
 *   put:
 *     summary: Atualiza uma entrega existente
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da entrega
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cidadeDestino:
 *                 type: string
 *               quilometragem:
 *                 type: number
 *               status:
 *                 type: string
 *               dataSaida:
 *                 type: string
 *                 format: date
 *               veiculoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Entrega atualizada com sucesso
 *       404:
 *         description: Entrega não encontrada
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /entregas/{id}:
 *   delete:
 *     summary: Deleta uma entrega por ID
 *     tags: [Entregas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da entrega
 *     responses:
 *       204:
 *         description: Entrega deletada com sucesso
 *       404:
 *         description: Entrega não encontrada
 */
router.delete('/:id', controller.delete);

export default router;
