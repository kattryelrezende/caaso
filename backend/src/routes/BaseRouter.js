// src/routes/BaseRouter.js
const express = require('express');

function createBaseRouter(controller, options = {}) {
    const router = express.Router();
    const {
        middleware = [],      // middlewares aplicados a todas as rotas
        publicRoutes = [],    // rotas públicas (sem autenticação)
        protectedRoutes = [], // rotas protegidas (com autenticação)
        extraRoutes = [],     // rotas extras (ex: comprar, obterUltima)
    } = options;

    // Rotas públicas (GET)
    router.get('/', controller.listar);
    router.get('/:id', controller.buscarPorId);

    // Rotas protegidas (POST, PUT, DELETE)
    if (middleware.length) {
        router.post('/', middleware, controller.criar);
        router.put('/:id', middleware, controller.atualizar);
        router.delete('/:id', middleware, controller.deletar);
    } else {
        router.post('/', controller.criar);
        router.put('/:id', controller.atualizar);
        router.delete('/:id', controller.deletar);
    }

    // Rotas extras
    extraRoutes.forEach(route => {
        router[route.method](route.path, ...(route.middleware || []), route.handler);
    });

    return router;
}

module.exports = createBaseRouter;