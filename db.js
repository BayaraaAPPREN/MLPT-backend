import mysql from "mysql";

const db = mysql.createConnection({
    host: '172.104.34.197', // Replace with your host name
  user: 'mlptteam',      // Replace with your database username
  port: 3306,           // Replace with port
  password: '',      // Replace with your database password
  database: 'mlpt' // // Replace with your database Name
})
db.connect(function(err) {
    if (err) console.log("Database connection failed\n Error : "+JSON.stringify(err));
    console.log('Database is connected successfully !');
});

module.exports = db;
  