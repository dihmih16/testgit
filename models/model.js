var db = require('./db');

const userSchema = new db.mongoose.Schema({
    username: { type: String, required: true },
    passwd: { type: String, required: true },
    fullname: { type: String, require: false },
    email: {type: String, require: true}
}, 

{ collection: 'users' });

const comicSchema = new db.mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Date, require: false, default: Date.now },
    image: {type: String, require: true},
    content: {type: String, require: true},
    describe: {type: String, require: true},
    coverImage: {type: String, require: true},
    idcomment: { type: db.mongoose.Schema.Types.ObjectId, ref: 'commentModel'},
    
}, 

{ collection: 'comics' });

const commentSchema = new db.mongoose.Schema({
    idcomic: { type: db.mongoose.Schema.Types.ObjectId, ref: 'comicModel'},
    content: {type: String, require: true},
    time: {type: Date, require: true, default: Date.now}
}, 

{ collection: 'comments' });

let userModel = db.mongoose.model('userModel', userSchema);
let comicModel = db.mongoose.model('comicModel', comicSchema);
let commentModel = db.mongoose.model('commentModel', commentSchema);

module.exports = {
    userModel, comicModel, commentModel
}