import { Request, Response } from 'express';
import { addCandidate, findCandidateById } from '../../application/services/candidateService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateCandidateStage = async (req: Request, res: Response) => {
    try {
        const candidateId = parseInt(req.params.id);
        const { current_interview_step } = req.body;

        if (!current_interview_step || typeof current_interview_step !== 'number') {
            return res.status(400).json({
                error: 'Se requiere current_interview_step y debe ser un número'
            });
        }

        // Verificar que el candidato existe y tiene una aplicación activa
        const application = await prisma.application.findFirst({
            where: {
                candidateId: candidateId
            }
        });

        if (!application) {
            return res.status(404).json({
                error: 'No se encontró una aplicación activa para este candidato'
            });
        }

        // Verificar que la etapa de entrevista existe
        const interviewStep = await prisma.interviewStep.findUnique({
            where: {
                id: current_interview_step
            }
        });

        if (!interviewStep) {
            return res.status(400).json({
                error: 'La etapa de entrevista especificada no existe'
            });
        }

        // Actualizar la etapa actual del candidato
        const updatedApplication = await prisma.application.update({
            where: {
                id: application.id
            },
            data: {
                currentInterviewStep: current_interview_step
            },
            select: {
                candidate: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                currentInterviewStep: true,
                position: {
                    select: {
                        title: true
                    }
                }
            }
        });

        res.status(200).json({
            message: 'Etapa de entrevista actualizada exitosamente',
            data: {
                candidate_name: `${updatedApplication.candidate.firstName} ${updatedApplication.candidate.lastName}`,
                position: updatedApplication.position.title,
                current_interview_step: updatedApplication.currentInterviewStep
            }
        });

    } catch (error) {
        console.error('Error al actualizar la etapa del candidato:', error);
        res.status(500).json({
            error: 'Error interno del servidor al actualizar la etapa del candidato'
        });
    }
};

export { addCandidate };