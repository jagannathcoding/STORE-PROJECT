import {neon} from "@neondatabase/serverless";

import dotenv from "dotenv";

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

console.log("DB ENV VARS:", {
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD
});

export const sql=neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)


//postgresql://neondb_owner:npg_rS0VAsEuPtT8@ep-frosty-fog-a4l5bx5c-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require