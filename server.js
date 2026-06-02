import express from 'express'
import postsRouter from './routers/postsRouter.js';

import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.SERVER_PORT || 3000;
const url = process.env.SERVER_URL || 'localhost';

app.use(express.json())
app.use('/posts', postsRouter)
app.use(errorHandler);
app.use(notFound);

app.listen(port, (error) =>{
    if(error) {
        console.error('Errore')
        return;
    }
    console.log('Server avviato')
})


