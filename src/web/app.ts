import express from 'express';
import userRouter from '../routes/user.router';
import carRouter from '../routes/car.router';
import rentalRouter from '../routes/rental.router';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';
import paymentRouter from '../routes/payment.router';


const app = express();
app.use(express.json());

// Configurando o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routes
app.use("/", userRouter)
app.use("/", carRouter)
app.use("/", rentalRouter)
app.use("/", paymentRouter)

export default app;