import express from 'express';
import morgan from 'morgan';
import layout from './middlewares/layout';
import indexRouter from './routes/render/indexRouter';
import apiRouter from './routes/api/apiRouter';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(layout);

server.use('/', indexRouter);
server.use('/api', apiRouter);

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
