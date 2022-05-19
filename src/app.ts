import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

import authorization from './security/authorization';

import routes from './routes';

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use('/protected',authorization);

app.use(routes);

export default app;