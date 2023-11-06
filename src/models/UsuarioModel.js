

class UsuarioModel {
    constructor(Nome, Email, Senha, CPF, Telefone, Endereco){
        this.Nome = Nome;
        this.Email = Email;
        this.Senha = Senha;
        this.CPF = CPF;
        this.Telefone = Telefone;
        this.Endereco = Endereco;
    }
}

module.exports = UsuarioModel;
