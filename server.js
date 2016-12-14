import Express from 'express';
import GraphHTTP from 'express-graphql';

const app = Express();

ap.use('/', GraphHTTP({
    schema: TODO,
    pretty: true,
    graphiql:true
}));

app.listen(3000, ()=>console.log("server is running"));