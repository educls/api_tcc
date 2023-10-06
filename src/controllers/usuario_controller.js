const bcrypt = require('bcrypt')
const serviceUsuarios = require('../services/usuarios-service')
const UsuarioModule = require('../models/usuario_module')

exports.post = async (req, res) => {
    try{
        const rows = serviceUsuarios.verificaSeEmailUsuarioExistente(req)

        const { username, email, password } = req.body;

        if(rows.length > 0) {
            return res.status(400).json(
                {
                    message: 'Email ja cadastrado....'
                }
            )
        };

        const senhaCriptografada = await bcrypt.hash(password, 10);

        const novoUsuario = {
            username,
            email,
            password: senhaCriptografada
        };
        
        const resultado = await serviceUsuarios.cadastraUsuario(novoUsuario)
        
        if(resultado == true){
            res.status(201).json(
                {
                    message: 'Usuario Cadastrado com sucesso'
                }
            )
        }if(resultado == false) {
            res.status(400).json(
                {
                    message: 'Usuario nao cadastrado'
                }
            )
        }

    }catch(error){
        console.log('Erro ao registrar:', error)
        res.status(500).json(
            {
                message: 'Opaa Erro no servidor'
            }
        );
    }
};