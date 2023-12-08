const Ftp = require("ftp");
const constants = require('../constants')

const ftp = new Ftp();

function uploadArquivoFTP(nome_arquivo){

  ftp.connect({
    host: '192.168.1.9',
    user: 'api',
    password: '1234'
  });
  
  ftp.on('ready', () => {
    ftp.put('E:/backup/Documentos/comprovante_matricula.pdf', `${nome_arquivo}.pdf`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Arquivo enviado com sucesso!');
      }
      ftp.end();
    });
  });
}

module.exports = uploadArquivoFTP;
