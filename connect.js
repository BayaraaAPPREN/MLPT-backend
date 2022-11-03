import mysql from "mysql";

export const db = mysql.createConnection({
    //172.104.34.197:3306
    host:"localhost",
    user:"root",
    password:"",
    database:"facebook"
})