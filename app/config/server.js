import Express from 'express';
import GraphHTTP from 'express-graphql';
import {Schema} from '../../db/schemas';
import path from 'path';
const app = Express();

app.use(Express.static(path.join(__dirname,'../../public')));
app.use('/api', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql:true
}));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../../public','index.html'));
});

export default app;