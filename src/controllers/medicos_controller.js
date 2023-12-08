const serviceMedicos = require('../services/medicos_service')
const MedicoModel = require('../models/MedicoModel')
const constants = require('../utils/constants')


exports.post = async (req, res) => {
    try{
        const { Nome, CPF, Senha, CRM, Especialidade } = req.body;

        const novoMedico = new MedicoModel(Nome, CPF, Senha, CRM, Especialidade)

        const result = await serviceMedicos.cadastraMedico(novoMedico)

        if(result == true){
            res.status(201).json(
                {message: constants.PHYSICIAN_REGISTERED}
            )
        }

    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
};

exports.get = async (req, res) => {
    try{
        let medicoInfos = []

        const id_medico = req.user.id

        medicoInfos = await serviceMedicos.listaMedico(id_medico)
        if(medicoInfos == undefined){
            return res.status(401).json(
                {message: constants.PHYSICIAN_NOT_FOUND}
            )
        }
        res.status(200).json({medicoInfos})


    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}

exports.delete = async (req, res) => {
    try{

        const id_medico = req.user.id

        const returnDelete = await serviceMedicos.deletaMedico(id_medico)

        if(returnDelete.affectedRows == 0) {
            return res.status(401).json(
                {message: constants.PHYSICIAN_NOT_FOUND}
            )
        }
        res.status(200).json(
            {message: constants.PHYSICIAN_DELETED_SUCESSFULL}
        )


    }catch(err){
        console.log(constants.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constants.SERVER_ERROR}
        );
    }
}