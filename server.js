import Express from 'express';
import GraphHTTP from 'express-graphql';
import {Schema} from './db/schemas';

const app = Express();

app.use('/api', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql:true
}));

app.listen(3000, ()=>console.log("server is running"));
export default app;