import Express from 'express';
import GraphHTTP from 'express-graphql';
import {Schema} from './db/schemas';
import {connect} from './db';
import chalk from 'chalk';
const app = Express();
const isDev = process.env.DB === 'DEV';
const port = require('./app/config/apiPort');

app.use(Express.static(__dirname + '/public'));
app.use('/api', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql:true
}));


connect(isDev)
.then(()=>{
    app.listen(port, ()=>console.log(chalk.blue(`SERVER IS RUNNING ON ${port}`)));
});
export default app;