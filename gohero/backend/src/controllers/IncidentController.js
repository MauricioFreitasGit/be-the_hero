const connnection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connnection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },
    async index(request, response) {

        const { page = 1 } = request.query;
        //Numero total de casos
        const [count] = await connnection('incidents').count();
        const incidents = await connnection('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*','ongs.email','ongs.name','ongs.whatsapp','ongs.city','ongs.city']);




        response.header('X-TOTAL-COUNT',count['count(*)']);
        return response.json(incidents);
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connnection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();


        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'operacao nao permitida' });
        }
        await connnection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};