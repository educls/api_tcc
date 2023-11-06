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

        const Endereco = {
            bairro: req.body.Endereco.bairro,
            rua: req.body.Endereco.rua,
            numero: req.body.Endereco.numero
        }

        let { Nome, Email, Senha, CPF, Telefone } = req.body;

        //Senha = await bcrypt.hash(Senha, 10);

        const novoUsuario = new UsuarioModel(Nome, Email, Senha, CPF, Telefone, Endereco)

        
        const resultado = await serviceUsuarios.cadastraUsuario(novoUsuario)
        
        if(resultado == true){
            res.status(201).json(
                {
                    message: 'Usuario Cadastrado com sucesso'
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