import express from 'express';
import authRoutes from './authRoutes';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoutes);

export default router;
