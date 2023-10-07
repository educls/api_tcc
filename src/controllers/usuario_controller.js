const bcrypt = require('bcrypt')
const serviceUsuarios = require('../services/usuarios-service')
const UsuarioModel = require('../models/UsuarioModel')
const geraID = require('../utils/functions/gera_id')

exports.post = async (req, res) => {
    try{
        const rows = await serviceUsuarios.verificaSeEmailUsuarioExistente(req)
        if(rows.length > 0) {
            return res.status(400).json({message: 'Email ja cadastrado....'})
        };

        let { username, email, password } = req.body;
        const id_usuario = geraID()

        password = await bcrypt.hash(password, 10);

        const novoUsuario = new UsuarioModel(id_usuario, username, email, password)
        
        const resultado = await serviceUsuarios.cadastraUsuario(novoUsuario)
        
        if(resultado == true){
            res.status(201).json(
                {
                    message: 'Usuario Cadastrado com sucesso',
                    id: id_usuario
                }
            )
        }else if(resultado == false) {
            res.status(401).json({message: 'Usuario nao cadastrado'})
        }

    }catch(error){
        console.log('Erro ao registrar:', error)
        res.status(500).json(
            {message: 'Opaa Erro no servidor'}
        );
    }
};

exports.get = async (req, res) => {
    try{
        const { id } = req.params
        let usuarioInfos = []

        usuarioInfos = await serviceUsuarios.listaUsuario(id)

        if(usuarioInfos.length <= 0) {
            return res.status(401).json({message: 'Usuario não encontrado...'})
        }
        res.status(200).json({usuarioInfos})

    }catch(error){
        console.log('Erro ao registrar:', error)
        res.status(500).json({message: 'Opaa Erro no servidor'});
    }
}

exports.delete = async (req, res) => {
    try{
        const { id } = req.params

        const returnDelete = serviceUsuarios.deletaUsuario(id)

        if(returnDelete.length <= 0) {
            return res.status(401).json({message: 'Usuario não encontrado...'})
        }
        res.status(200).json({message: 'Usuario Deletado com sucesso...'})

    }catch(error){
        console.log('Erro ao registrar:', error)
        res.status(500).json(
            {message: 'Opaa Erro no servidor'}
        );
    }
}