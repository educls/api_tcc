const mysql = require('mysql2/promise');
const Database = require('../data/database')
const constants = require('../utils/constants');

const db = new Database();

exports.verificaCrmMedicoExistente = async (req) => {

    await db.connect();
    
    const { CRM } = req.body;

    const rows = await db.query(constants.SQL_SELECT_CRM_PHYSICIAN, [CRM])
    await db.close();

    return rows
}