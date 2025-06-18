// src/@types/express/index.d.ts
import 'express';

declare module 'express' {
  export interface Request {
    user?: any; // ou você pode tipar com o payload do JWT
  }
}
