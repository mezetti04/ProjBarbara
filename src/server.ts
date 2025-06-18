import express from 'express';
import routes from './routes';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());

setupSwagger(app); // chama o Swagger uma vez só
app.use('/', routes); // rotas unificadas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});

