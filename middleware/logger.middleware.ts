import { Request, Response, NextFunction } from "express";
import {v4 as uuidv4} from "uuid";

const getProccessingTimeInMS = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}

export default function logger(req: Request, res:Response, next: NextFunction){

    //Unique Identifier
    const id = uuidv4();

    //get time stamp
    const now = new Date();
    const timeStamp = [now.getFullYear(),'-', now.getMonth() + 1,'-', now.getDate(), 
        '-', now.getHours(),'-', now.getMinutes,'-', now.getSeconds].join('');


    //get api endpoint
    const {method, url} = req;

    //Log start execution process
    const start = process.hrtime();
    const startText = `Start:${getProccessingTimeInMS(start)}`;
    const idText = `[${id}]`;
    const timeStampText = `[${timeStamp}]`;

    //all components are ready, show the entry
    console.log(`${idText}${timeStampText}${method} : ${url} ${startText}`);

    res.once('finish', () =>{
        //log end
        const end = process.hrtime(start);
        const endText = `END${getProccessingTimeInMS(end)}`;
        console.log(`${idText}${timeStampText}${method} : ${url} ${res.statusCode} ${endText}`);
    });

    next();

};