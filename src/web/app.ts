import express from 'express';
import userRouter from '../routes/user.router';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';


const app = express();
app.use(express.json());

// Configurando o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routes
app.use("/", userRouter)

export default app;