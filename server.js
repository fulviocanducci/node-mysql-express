const express = require('express');
const bodyParser = require('body-parser');
const setRouterTodos = require('./router-todos');

/*
* Express Server Http
*/
const app = express();
const port = 3000;
const router = express.Router();

/*
* Routes
*/
setRouterTodos.setRouter(router);

/*
* Middleware
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

/*
* Listen
*/
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log('Para derrubar o servidor: ctrl + c');
});