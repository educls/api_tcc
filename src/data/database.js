const mysql = require('mysql2/promise');
const constants = require('../utils/constants')

class Database {
    constructor() {
        this.connection = null;
    }

    async connect() {
        try{
            this.connection = await mysql.createConnection({
                host: constants.HOST_DB,
                user: constants.DB_USER,
                password: constants.DB_PASSWORD,
                database: constants.DB_DATABASE
            });
            console.log("Conexão com o banco de dados estabelecida!");
        }catch (err) {
            console.log("Erro ao conectar ao banco de dados: ", err)
        }
    }

    async close() {
        try{
            if (this.connection) {
                await this.connection.end();
                console.log("Conexão com o banco de dados fechada!")
            }
        }catch (err) {
            console.log("Erro ao fechar conexão com o banco de dados: ", err)
        }
    }

    async query(sqlCommand, values){
        try{
            const connection = this.getConnection();
            const [rows] = await connection.execute(sqlCommand, values);
            return rows
        }catch (err) {
            console.log("Erro ao executar a consulta: ", err)
        }
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = Database;

