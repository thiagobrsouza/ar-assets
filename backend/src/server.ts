import 'express-async-errors'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { routes } from './routes';
import { handleError } from './middlewares/handle.error';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use(routes);

app.use(handleError);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});