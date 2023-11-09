const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const serviceLogin = require('../services/login_service')
const LoginModel = require('../models/UsuarioModel')
const constant = require('../utils/constants')

exports.post = async (req, res) => {
    try{
        const rows = await serviceLogin.verificaSeEmailUsuarioExistente(req)
        if(rows.length > 0) {

            let { email, password } = req.body
            password = await bcrypt.hash(password, 10);

            const novoLogin = {email: email, password: password}

            const token = jwt.sign(novoLogin, constant.SECRET_KEY, { expiresIn: '1h' })

            return res.status(200).json({message: constant.LOGIN_SUCESSFULL, token})
        }else{
            return res.status(401).json({message: constant.LOGIN_UNSUCCESSFUL})
        }

    }catch(error){
        console.log(constant.REGISTER_ERROR, error)
        res.status(500).json(
            {message: constant.SERVER_ERROR}
        );
    }
}
