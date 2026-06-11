import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { handleError } from './middlewares/handleError';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(morgan('dev')); // Log HTTP requests to the console
app.use(cors());

app.use(routes);

app.use(handleError);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});