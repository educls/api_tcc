const bcrypt = require('bcrypt')
const serviceUsuarios = require('../services/usuarios-service')
const UsuarioModel = require('../models/UsuarioModel')
const geraID = require('../utils/functions/gera_id');
const constants = require('../utils/constants');

exports.post = async (req, res) => {
    try{
        const rows = await serviceUsuarios.verificaSeEmailUsuarioExistente(req)
        if(rows != null) {
            return res.status(400).json({message: constants.EMAIL_ALREADY_EXISTS})
        };

        const { estado, cidade, bairro, rua, numero } = req.body.Endereco;
        const Endereco = { estado, cidade, bairro, rua, numero };

        let { Nome, Email, Senha, CPF, Telefone } = req.body;

        //Senha = await bcrypt.hash(Senha, 10);

        const novoUsuario = new UsuarioModel(Nome, Email, Senha, CPF, Telefone, Endereco)
        
        const resultado = await serviceUsuarios.cadastraUsuario(novoUsuario)
        
        if(resultado == true){
            res.status(201).json(
                {
                    message: constants.USER_REGISTERED
                }
            )
        }else if(resultado == false) {
            res.status(401).json({message: constants.USER_NOT_FOUND})
        }

    }catch(error){
        console.log(constants.REGISTER_ERROR, error)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
};

exports.get = async (req, res) => {
    try{
        let usuarioInfos = []

        const id_user = req.user.id

        usuarioInfos = await serviceUsuarios.listaUsuario(id_user)

        if(usuarioInfos.length <= 0) {
            return res.status(401).json({message: constants.USER_NOT_FOUND})
        }
        res.status(200).json({usuarioInfos})

    }catch(error){
        console.log(constants.REGISTER_ERROR, error)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.delete = async (req, res) => {
    try{
        const id_user = req.user.id

        const returnDelete = serviceUsuarios.deletaUsuario(id_user)

        if(returnDelete.length <= 0) {
            return res.status(401).json({message: constants.USER_NOT_FOUND})
        }
        res.status(200).json({message: constants.USER_DELETED_SUCESSFULL})

    }catch(error){
        console.log(constants.REGISTER_ERROR, error)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}