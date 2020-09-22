var db = require('../models');

// '/' routes
exports.getTodos = function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err.message);
    });
};

exports.postTodos = function(req, res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

// '/:todoId' routes
exports.showTodo = function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.updateTodo = function(req, res){
    db.Todo.findByIdAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    });
};

exports.deleteTodo = function(req, res){
    db.Todo.findByIdAndDelete({_id: req.params.todoId})
    .then(function(){
        res.json({message: "Todo deleted"})
    })
    .catch(function(err){
        res.send(err);
    });
}

module.exports = exports