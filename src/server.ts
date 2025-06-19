// src/server.ts
import express from 'express';
import routes from './routes';
import { setupSwagger } from './config/swagger';
import cors from 'cors'; // <-- ADICIONE ESTA LINHA: Importe o pacote cors

const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use(cors()); // <-- ADICIONE ESTA LINHA: Use o middleware CORS AQUI, ANTES das suas rotas
                 // Esta linha deve vir antes de qualquer app.use() que use as rotas

setupSwagger(app); // Configuração do Swagger
app.use('/', routes); // Suas rotas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});