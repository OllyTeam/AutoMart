import express from 'express';
import bodyparser from 'body-parser';
import  route from './routes/routes';

const app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/api/v1/',route);
const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Goood Runing on ${port}`);
});

