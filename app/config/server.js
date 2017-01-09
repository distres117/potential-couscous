import Express from 'express';
import GraphHTTP from 'express-graphql';
import {Schema} from '../../db/schemas';
import path from 'path';
const app = Express();

app.use(Express.static(path.join(__dirname,'../../public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
  next();
});

app.use('/api', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql:true
}));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../../public','index.html'));
});

export default app;