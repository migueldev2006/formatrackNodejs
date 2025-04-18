import pkg from 'pg';
import dotenv from 'dotenv';

const {Pool} = pkg

dotenv.config({ path: "./env/.env" });

export const pool = new Pool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        port:process.env.DB_PORT, 
        database:process.env.DB_DATABASE
    }
) 