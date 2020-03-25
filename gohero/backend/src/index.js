const express =  require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
//Configura o express avisando que as requisicoes serao com json
app.use(express.json());

app.use(routes);

//Ouvir a porta 3333
app.listen(3333);