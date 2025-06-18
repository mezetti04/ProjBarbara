import { Router } from 'express';
import entregaRoutes from './entrega.routes';
import veiculoRoutes from './veiculo.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/entregas', entregaRoutes);
router.use('/veiculos', veiculoRoutes);
router.use('/auth', authRoutes);

export default router;
