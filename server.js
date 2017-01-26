import app from './app/config/server';
import {connect} from './db';

const port = require('./app/config/apiPort');
const isDev = process.env.DB === 'DEV';

connect(isDev)
.then(()=>{
    app.listen(3000, ()=>console.log(`SERVER IS RUNNING...`));
});