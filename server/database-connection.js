//import pg and dotenv
import pg from "pg";
import dotenv from "dotenv";

//configure dotenv
dotenv.config();

//get your connection string value from .env file
const dbConnectionString = process.env.DB_URL;

//set up a pool
export const db = new pg.Pool({
    connectionString: dbConnectionString,
});