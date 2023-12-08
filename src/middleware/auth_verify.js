const jwt = require('jsonwebtoken');
const constants = require('../utils/constants')

function verificaToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json(
        {message: 'Token não fornecido'}
      );
    }
  
    jwt.verify(token, constants.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json(
          {message: 'Token invalido'});
      }
      req.user = decoded;
      next();
    });
}

module.exports = verificaToken;