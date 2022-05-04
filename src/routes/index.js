import express from 'express';
import swaggerConfig from '../configs/swagger';
import authRoutes from './authRoutes';
import swagger from 'swagger-ui-express';

const router = express.Router({ mergeParams: true });

// API document route
router.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));

router.use('/auth', authRoutes);

export default router;
