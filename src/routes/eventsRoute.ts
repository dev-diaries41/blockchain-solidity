import express from 'express';
import { eventsController } from '../controllers/eventsController';

const router = express.Router();

router.post('/', eventsController);

export default router;
