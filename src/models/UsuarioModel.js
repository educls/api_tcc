

class UsuarioModel {
    constructor(id_usuario, username, email, password){
        this.id_usuario = id_usuario
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

module.exports = UsuarioModel;
