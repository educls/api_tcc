const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const serviceLoginMedico = require('../services/login_medico_service');
const LoginMedicoModel = require('../models/LoginMedicoModel');
const constant = require('../utils/constants');

exports.post = async (req, res) => {
    try{
        const rows = await serviceLoginMedico.verificaCrmMedicoExistente(req)
        if(rows.length > 0){
            const { ID_Medico, Nome, CRM, Especialidade } = rows[0]

            const novoLogin = {id: ID_Medico, nome: Nome, crm: CRM, especialidade: Especialidade}

            const token = jwt.sign(novoLogin, constant.SECRET_KEY, {expiresIn: '1h'})

            return res.status(200).json({message: constant.LOGIN_SUCESSFULL, token})
        }else{
            return res.status(401).json({message: constant.LOGIN_UNSUCCESSFUL})
        }
    }catch(err){
        console.log(constant.REGISTER_ERROR, err)
        res.status(500).json(
            {message: constant.SERVER_ERROR}
        );
    }
}