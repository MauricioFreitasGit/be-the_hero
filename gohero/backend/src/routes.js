const expresss = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//Desacoplando o modulo de rotas em uma nova variavel
const routes = expresss.Router();

routes.post('/sessions', SessionController.create)

//rota ongs
routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        city: Joi.string().required(),
        whatsapp: Joi.string().required().min(10).max(11),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile',celebrate({
    [Segments.HEADERS]:Joi.object({
        Authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);


routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id:Joi.string().required()
    })
}), IncidentsController.delete);


//exportando a rota
module.exports = routes;