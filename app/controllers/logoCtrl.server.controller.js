var mongoose = require('mongoose'),
	Todo = mongoose.model('Todo');

var multer = require('multer');

/**
* Upload photograph
*/
exports.save = function(req, res, next) {

    //Get club and file
    var club = req.user.club;
    var file = req.file;

    //Update
    club.photograph = {
        data: file.buffer,
        mimeType: file.mimetype
    };

    //Save
    club.save().then(() => {
        res.end();
    }).catch(next);
};

/**
* Stream photograph
*/
exports.stream = function(req, res, next) {
    var club = req.club;
    res.contentType(club.photograph.mimeType);
    res.send(club.photograph.data);
};

/**
* Upload middleware
*/
exports.upload = function(req, res, next) {

    //Create upload middleware
    var upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 50000000
        }
    }).single('photograph');

    //Use middleware
    upload(req, res, next);
};