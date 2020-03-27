const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),

    })

}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;

// rotas / recurso

/*
 * Metodo HTTP:
 *
 * GET: buscar/listar uma informação do back-end
 * POST: criar uma informação no back-end
 * PUT : a=Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/*
 * Tipos de parametros :
 *
 * Query Parms: parametros nomeados enviados na rota após o "?" (Filtros , paginação )
 * Route Parms: Parametros utilizados para identificar recursos
 * Request Body: Corpo da requisição , utilizado para criar ou alterar recursos
 *
 */

/**
 *  SQL : MySQL, SQLite, PostegreSQL, Oracle, Microsoft SQL
 *  noSQL : MongDB. CouchDB, etc
 */
