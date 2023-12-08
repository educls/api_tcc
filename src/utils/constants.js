module.exports = {

LOGIN_SUCESSFULL: "Login Relizado com Sucesso",
LOGIN_UNSUCCESSFUL: "Login Não Realizado com Sucesso",
SERVER_ERROR: "Opaa Erro no servidor",
REGISTER_ERROR: "Erro ao Registrar",
USER_NOT_FOUND: "Usuario não Encontrado",
USER_REGISTERED: "Usuario Cadastrado com sucesso",
PHYSICIAN_REGISTERED: "Medico Cadastrado com sucesso",
PHYSICIAN_NOT_FOUND: "Medico não Encontrado",
QUERY_NOT_FOUND: "Nenhuma consulta Encontrada", 
EMAIL_ALREADY_EXISTS: "Email já Cadastrado",
USER_DELETED_SUCESSFULL: "Usuario Deletado com Sucesso",
PHYSICIAN_DELETED_SUCESSFULL: "Medico Deletado com Sucesso",
QUERY_DELETED_SUCESSFULL: "Consulta Deletada com Sucesso",
SOME_FIELDS_NULL: "Um ou mais campos obrigatorios estao nulos",
HOST_DB: "localhost",
DB_USER: "root",
DB_PASSWORD: '',
DB_DATABASE: "aplication1.3",
SECRET_KEY: "xyz12",

SQL_SELECT_EMAIL: "select * from usuarios where Email = ?",
SQL_SELECT_ID_PACIENTE: "select * from usuarios where ID_Paciente = ? and Status = ?",
SQL_SELECT_ID_MEDICO: "select * from medicos where ID_Medico = ?",
SQL_SELECT_ESPECIALIDADE_MEDICO: "select * from medicos where Especialidade = ?",
SQL_SELECT_EMAIL_AND_STATUS: "select * from usuarios where email = ? and status = ?",
SQL_SELECT_CRM_PHYSICIAN: "select * from medicos where CRM = ?",
SQL_SELECT_QUERY: "select * from consultas where ID_Paciente = ?",

SQL_INSERT_USERS: "insert into usuarios (nome, email, senha, cpf, telefone, status) values (?, ?, ?, ?, ?, ?)",
SQL_INSERT_ADDRESS: "insert into enderecos (Estado, Cidade, Bairro, Rua, Numero, ID_Paciente) values (?, ?, ?, ?, ?, ?)",
SQL_INSERT_MEDICO: "insert into medicos (Nome, CPF, Senha, CRM, Especialidade) values (?, ?, ?, ?, ?)",
SQL_INSERT_CONSULTA: "insert into consultas (ID_Paciente, ID_Medico, Especialidade, DataConsulta, HoraConsulta, Estado) values (?, ?, ?, ?, ?, ?)",

SQL_DELETE_USERS: "update usuarios set Status = ? where ID_Paciente = ?",
SQL_DELETE_PHYSICIAN: "delete from medicos where ID_Medico = ?",
SQL_DELETE_QUERY: "delete from consultas where ID_consulta = ?"

}