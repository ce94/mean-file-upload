module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    // Match any URL with 'todos' in the path
    app.get(/todos/, index.rendertodo);

    // Match the rest
    app.get('*', index.render);
};