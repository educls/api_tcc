const constants = require('../utils/constants');
const Database = require('../data/database');
const uploadArquivoFTP = require('../utils/functions/conectionFTPserver')

const db = new Database();

exports.agendaConsulta = async (consulta) => {
    const { ID_Paciente, ID_Medico, Especialidade, DataConsulta, HoraConsulta, Estado } = consulta;

    await db.connect();
    const result = await db.query(constants.SQL_INSERT_CONSULTA, [ID_Paciente, ID_Medico, Especialidade, DataConsulta, HoraConsulta, Estado])
    db.close()

    uploadArquivoFTP(`${ID_Paciente}_${result.insertId}`)

    if(result){
        return true
    }else {
        return false
    }
}

exports.listaConsultas = async (id) => {
    await db.connect();

    const rows = await db.query(constants.SQL_SELECT_QUERY, [id])
    await db.close();

    return rows
}

exports.listaMedicoPelaEspecialidade = async (especialidade) => {

    await db.connect();

    const [rows] = await db.query(constants.SQL_SELECT_ESPECIALIDADE_MEDICO, [especialidade])
    await db.close();

    return rows
}

exports.deleteConsulta = async (id) => {

    await db.connect();

    const result = await db.query(constants.SQL_DELETE_QUERY, [id])
    await db.close()
    console.log(result)

    if(result.affectedRows > 0){
        return true
    }else {
        return false
    }
}