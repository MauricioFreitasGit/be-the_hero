const connnection = require('../database/connection');


module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connnection('ongs')
        .where('id', id)
        .select('name')
        .first();

        //se a ong nao existir 
        if(!ong){
            return response.status(400).json({ error : 'A ong nao foi encontrado'})
        }

        return response.json(ong);
    }

}