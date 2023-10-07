

const caracteres = 'abcdefgh&ijklmnopqrst$uvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

function gera_id(){
    
    let id_usuario = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        id_usuario += caracteres.charAt(randomIndex);
    }
    return id_usuario;
}

module.exports = gera_id;