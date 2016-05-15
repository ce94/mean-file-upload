var users = require('../../app/controllers/users.server.controller'),
	todos = require('../../app/controllers/todos.server.controller'),
    logoCtrl = require('../../app/controllers/logoCtrl.server.controller');

module.exports = function(app) {
	app.route('/api/todos')
		.get(todos.list)
		.post(users.requiresLogin, todos.create, logoCtrl.upload, logoCtrl.save);

	app.route('/api/todos/:todoId')
		.get(todos.read, logoCtrl.stream)
		.put(users.requiresLogin, todos.hasAuthorization, todos.update)
		.delete(users.requiresLogin, todos.hasAuthorization, todos.delete);

	app.param('todoId', todos.todoByID);
};