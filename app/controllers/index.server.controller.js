exports.rendertodo = function(req, res) {
    res.render('index', {
    	title: 'Todo MEAN MVC',
    	user: JSON.stringify(req.user)
    });
};
exports.render = function(req, res) {
    res.render('index', {
    	title: 'MEAN MVC',
    	user: JSON.stringify(req.user)
    });
};