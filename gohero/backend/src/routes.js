const expresss = require('express');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//Desacoplando o modulo de rotas em uma nova variavel
const routes = expresss.Router();

routes.post('/sessions',SessionController.create)

//rota ongs
routes.get('/ongs',OngController.index)
routes.post('/ongs', OngController.create);

routes.get('/profile',ProfileController.index);


routes.post('/incidents',IncidentsController.create);
routes.get('/incidents',IncidentsController.index);
routes.delete('/incidents/:id',IncidentsController.delete);


//exportando a rota
module.exports = routes;