const mysql = require('mysql2');

const conn = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
     

});

conn.connect((error)=>{
    if(error) throw error;
    console.log(`Conectado ao banco: ${process.env.DB_NAME}`)
});
exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}

module.exports = conn;