// src/routes/veiculo.routes.ts
import { Router } from 'express';
import { VeiculoController } from '../controllers/VeiculoController';
import { authenticateJWT } from '../middleware/auth';


const router = Router();
const controller = new VeiculoController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Veiculo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         renav:
 *           type: integer
 *           example: 123456789
 *         placa:
 *           type: string
 *           example: "ABC1234"
 *         modelo:
 *           type: string
 *           example: "Furgão"
 *         marca:
 *           type: string
 *           example: "Ford"
 *         ano:
 *           type: integer
 *           example: 2015
 *         capacidade:
 *           type: integer
 *           example: 2000
 */

/**
 * @swagger
 * tags:
 *   name: Veiculos
 *   description: Gerenciamento de veículos
 */

/**
 * @swagger
 * /veiculos:
 *   get:
 *     summary: Retorna todos os veículos
 *     tags: [Veiculos]
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veiculo'
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /veiculos/{id}:
 *   get:
 *     summary: Retorna um veículo específico
 *     tags: [Veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
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
 * /veiculos:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Veiculos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 */
router.post('/', controller.create);

/**
 * @swagger
 * /veiculos/{id}:
 *   put:
 *     summary: Atualiza um veículo existente
 *     tags: [Veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /veiculos/{id}:
 *   delete:
 *     summary: Deleta um veículo por ID
 *     tags: [Veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     responses:
 *       204:
 *         description: Veículo deletado com sucesso
 *       404:
 *         description: Veículo não encontrado
 */
router.delete('/:id', controller.delete);

export default router;
