//Importa aquivo de conexao 
const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {
    async index(request,response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    async create(request, response) {
        //forcando cada parametro para que o usuario nao envie mas do que o necessario
        const { name, email, whatsapp, city, uf } = request.body;

        //criando o id com 4 carateres de bite hexadeciamais
        const id = crypto.randomBytes(4).toString('HEX');

        //insere dados na tabela (metodo await faz o node esperar a resposta para prosseguir o codigo)
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id })
    }
};