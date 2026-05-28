import express from 'express'
import postsRouter from './routers/postsRouter.js';

const app = express();
const port = process.env.SERVER_PORT || 3000;
const url = process.env.SERVER_URL || localhost;

app.use(express.json())
app.use('/posts', postsRouter)

app.listen(`${port}`, (error) =>{
    if(error) {
        console.error('Errore')
        return;
    }
    console.log('Server avviato')
})

