import express, { Request, Response } from 'express';
import { updateCandidateStage } from '../controllers/candidateController';

const router = express.Router();

router.put('/:id/stage', async (req: Request, res: Response) => {
    await updateCandidateStage(req, res);
});

export default router; 