import { createPool, Pool } from "mysql";
import dotenv from "dotenv";

dotenv.config();
let pool: Pool | null = null;

const initializeMySqlConnector = () => {
    try{

        pool = createPool({
            connectionLimit:
                parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port:
                parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host:
                process.env.MY_SQL_DB_HOST,
            user:
                process.env.MY_SQL_DB_USER,
            password:
                process.env.MY_SQL_DB_PASSWORD,
            database:
                process.env.MY_SQL_DB_DATABASE,
        });
        
        console.debug();
        console.log("process.env.MY_SQL_DB_DATABASE: " + process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
            if(err){
                console.log("There was an error");
                throw new Error("Cannot make connection");
                
            }
            else{
                console.log("connection made");
                connection.release();
            }
        })
    }
    catch(error){
        console.error("mysql.error" + error);
        throw new Error("Fail to make connection");
    }
};

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if(!pool){
            initializeMySqlConnector();
        }
    
    
    return new Promise<T>((resolve, reject) => {
        pool!.query(query, params, (error, results) =>{
            if(error) reject(error);
            else resolve(results);
        });
    });
    
    }catch (error) {
        console.error("mysql.connector", error);
        throw new Error("Failed to execute Query");
    }
}