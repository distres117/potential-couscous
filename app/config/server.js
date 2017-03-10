import Express from 'express';
import GraphHTTP from 'express-graphql';
import {Schema} from '../../db/schemas';
import path from 'path';
import {getDetails, getList, getDetailsGp} from '../services/acpyService';
const app = Express();
const gpRouter = Express.Router();
const bodyParser = require('body-parser');
app.use('/', Express.static(path.join(__dirname,'../../public')));

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
app.use(bodyParser.urlencoded({extended:true}));
gpRouter.post('/getDetails', async (req,res,next)=>{
    const {datasetName, datasetType, location} =  req.body;
    const result = await getDetails(datasetName, datasetType, location || '');
    res.json(result);
});
gpRouter.post('/getDetailsGp', async (req,res,next)=>{
    const {datasetName,datasetType, location} = req.body;
    console.log(req.body);
    const result = await getDetailsGp(datasetName,datasetType, location || '');
    res.json(result);
});
gpRouter.post('/getList', async (req,res,next)=>{
    const result = await getList();
    res.json(result);
});
app.use('/gp', gpRouter);



app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../../public','index.html'));
});

export default app;