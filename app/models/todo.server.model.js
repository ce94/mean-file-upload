var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * File schema
 */
var FileSchema = new Schema({
  url: String,
  mimeType: String,
  data: Buffer
}, {
  _id: false
});

/**
 * Transformation to JSON
 */
FileSchema.options.toJSON = {
  transform: function(doc, ret) {
    return ret.url || '';
  }
};

var TodoSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: "Title can't be blank"
	},
	comment: {
		type: String,
		default: '',
		trim: true
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	completed: {
		type: Boolean,
		default: false
	},
    photograph: FileSchema
});
mongoose.model('Todo', TodoSchema);
