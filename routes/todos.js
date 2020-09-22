const { Router } = require('express');

var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    helpers = require('../helpers/todos');

router.route('/')
.get(helpers.getTodos)
.post(helpers.postTodos);

router.route('/:todoId')
.get(helpers.showTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo);

module.exports = router;