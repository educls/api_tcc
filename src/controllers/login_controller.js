const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const serviceLogin = require('../services/login_service')
const LoginModel = require('../models/UsuarioModel')
const secretKey = 'xyz@9988027';

exports.post = async (req, res) => {
    try{
        const rows = await serviceLogin.verificaSeEmailUsuarioExistente(req)
        if(rows.length > 0) {

            let { email, password } = req.body
            password = await bcrypt.hash(password, 10);

            const novoLogin = {email: email, password: password}

            const token = jwt.sign(novoLogin, secretKey, { expiresIn: '1h' })

            return res.status(200).json({message: 'Login Realizado....', token})
        }else{
            return res.status(401).json({message: 'Login não Realizado....'})
        }

    }catch(error){
        console.log('Erro ao registrar:', error)
        res.status(500).json(
            {message: 'Opaa Erro no servidor'}
        );
    }
}
