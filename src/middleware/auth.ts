// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'seu_segredo_aqui'; // ou carregue de config
    const decoded = jwt.verify(token, secret);

    // Opcional: armazenar o payload decodificado na request
    req.user = decoded; // você pode tipar isso depois se quiser

    next(); // segue para o próximo middleware ou controller
  } catch (err) {
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};
