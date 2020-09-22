var mongoose = require('mongoose');
require("dotenv").config();
var databaseUrl = process.env.DATABASEURL || 'mongodb://localhost/todo-api';

mongoose.set('debug', true);
await mongoose.connect(databaseUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.catch(function(err){
    console.log(err);
});

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');