function routes (app) {
    app.use('/usuário', require('./routes/usuario.js'));
    app.use('/tarefa', require('./routes/tarefa.js'));
    return;
}

module.exports = routes;