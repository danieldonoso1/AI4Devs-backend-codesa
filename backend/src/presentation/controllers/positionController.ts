import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ApplicationWithInterviews {
    candidate: { firstName: string; lastName: string };
    currentInterviewStep: number;
    interviews: { score: number | null }[];
}

export const getPositionCandidates = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);

        const candidates = await prisma.application.findMany({
            where: {
                positionId: positionId
            },
            select: {
                candidate: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                },
                currentInterviewStep: true,
                interviews: {
                    select: {
                        score: true
                    }
                }
            }
        });

        const formattedCandidates = candidates.map((application: ApplicationWithInterviews) => {
            // Calcular el promedio de puntuación
            const scores = application.interviews
                .map((interview: { score: number | null }) => interview.score)
                .filter((score: number | null): score is number => score !== null);
            
            const averageScore = scores.length > 0 
                ? scores.reduce((a, b) => a + b, 0) / scores.length 
                : 0;

            return {
                full_name: `${application.candidate.firstName} ${application.candidate.lastName}`,
                current_interview_step: application.currentInterviewStep,
                candidate_average_score: parseFloat(averageScore.toFixed(2))
            };
        });

        res.status(200).json({
            candidates: formattedCandidates
        });

    } catch (error) {
        console.error('Error al obtener candidatos de la posición:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor al obtener los candidatos' 
        });
    }
}; 