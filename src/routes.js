function routes (app) {
    app.use('/users', require('./routes/usuario'));
    app.use('/tarefa', require('./routes/tarefa.js'));
    return;
}

module.exports = routes;