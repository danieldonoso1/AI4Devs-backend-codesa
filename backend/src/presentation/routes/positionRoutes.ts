import express, { Request, Response } from 'express';
import { getPositionCandidates } from '../controllers/positionController';

const router = express.Router();

router.get('/:id/candidates', async (req: Request, res: Response) => {
    await getPositionCandidates(req, res);
});

export default router; 