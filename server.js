import Express from 'express';
import GraphHTTP from 'express-graphql';
import {Schema} from './db/schemas';

const app = Express();

app.use('/', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql:true
}));

app.listen(3000, ()=>console.log("server is running"));