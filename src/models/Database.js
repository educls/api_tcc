const mysql = require('mysql2/promise');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'aplication'
        });
    }
    async query(sqlCommand, values){
        try{
            const [rows] = await connection.execute(sqlCommand, values);
            return rows
        }catch (err) {
            console.log("Erro ao executar a consulta: ", err)
        }
    }
}

module.exports = new Database();