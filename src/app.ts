import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import logger from './../middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet'

import booksRouter from './books/books.routes';

dotenv.config();

const app = express();

//Port to run application
const port = 5000;

// Make sure you understand the following line of code.


//parse JSON bodies
app.use(express.json());

//pare URL-encoded boies
app.use(express.urlencoded({extended: true}));

//enable all cors requests
app.use(cors());

//added security middleware
app.use(helmet());

//Express Routing getting the HTTP Response from the initial directory '\'
app.use('/', [booksRouter])


console.log(process.env.MY_SQL_DB_HOST);

app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`)
    
    });


    if(process.env.NODE_ENV == 'development'){
        //add logger middleware
        app.use(logger);
        console.log(process.env.GREETING + "in dev mode");
    }