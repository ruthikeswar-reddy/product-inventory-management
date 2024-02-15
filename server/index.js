import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// DATA IMPORTS
import User from './models/User.js';
import { dataProduct, dataProductStat, dataUser, dataTransaction, dataOverallStat, dataAffiliateStat } from './data/index.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


/*ROUTES*/

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);


/* MONGOOSE SET UP AND RUNNING THE SERVER */

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL)
.then((data)=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT} sucessfully`)
    });
    console.log(`Connected to the host: ${data.connection.host} successfully`)
    /*INSER DATA ONLY ONE TIME-userData from data file, it contains data of users */
    /*to insert many records at once we use insertMany */
    /* I WILL EXECUTE THE COMMAND ONLY ONCE AND COMMENT IT, if we try to insert many times the data will get duplicated and we get a lot of errors as email:mentioned unique */
    {/*User.insertMany(dataUser);*/}
    /* insert products and productStats data only once */
    {/*Product.insertMany(dataProduct);*/}
    {/*ProductStat.insertMany(dataProductStat);*/} 
    /* the above query is executed on 8/2/24 at 12:50pm afternoon so as the records are inserted once we gonna comment it*/
    {/*Transaction.insertMany(dataTransaction);*/}
    {/*OverallStat.insertMany(dataOverallStat);*/}
    {/*AffiliateStat.insertMany(dataAffiliateStat);*/}
}).catch((err)=>{
    console.log(`${err} not conncected`);
})