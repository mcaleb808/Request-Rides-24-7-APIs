import config from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import driversRoutes from './v1/routes/driversRoutes';
import ridersRoutes from './v1/routes/ridersRoutes';
import tripsRoutes from './v1/routes/tripsRoutes';

config.config();
const app = express();
const { PORT = 8000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/drivers', driversRoutes);
app.use('/api/v1/riders', ridersRoutes);
app.use('/api/v1/trips', tripsRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`));

export default server;
