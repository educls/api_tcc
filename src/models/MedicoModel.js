
class MedicoModel {
    constructor(Nome, CPF, Senha, CRM, Especialidade){
        this.Nome = Nome;
        this.CPF = CPF;
        this.Senha = Senha;
        this.CRM = CRM;
        this.Especialidade = Especialidade;
    }
}

module.exports = MedicoModel;