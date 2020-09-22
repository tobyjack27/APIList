$(document).ready(function(){
    // fetch api data as json
    $.getJSON('/api/todos')
    // add data to list
    .then(addTodos)
    .catch(handleError);
    // setup enter key as trigger when using input field
    $('#todoInput').keypress(function(event){
        if(event.which == 13){  // 13 = enter key code
            createTodo()
        };
    });
    // setup listener for 'X's – need to select list as spans not present at this stage, then can specifiy spans within list
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
    $('.list').on('click', 'span', function(event){
        // stop clicks on the span triggering li response
        event.stopPropagation();
        deleteTodo($(this).parent());
    });
});

function addTodos(todos){
    // add todos to the page
    todos.forEach(function(todo){
        addTodo(todo);
    });
};

function addTodo(todo){
    // append todo to list
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    // add _id and completed data using jQuery
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    // check if task completed
    if(todo.completed){
        newTodo.addClass('done');
    };
    // append to list
    $('.list').append(newTodo);
}

function createTodo(){
    // pick up text from input field
    var usrInput = $('#todoInput').val();
    //send post request with collected text
    $.post('api/todos', {name: usrInput})
    .then(function(newTodo){
        // empties input field
        $('#todoInput').val('')
        // append new todo to list
        addTodo(newTodo);
    })
    .catch(handleError);
}

function updateTodo(todo){
    // get put url
    var updateUrl = 'api/todos/' + todo.data('id');
    // get opposite of current state
    var isDone = !todo.data('completed');
    // create update object to pass into request
    var updateData = {completed: isDone};
    // send request
    $.ajax({
        method: 'put',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        // update class on page
        todo.toggleClass('done');
        // update li jQuery data
        todo.data('completed', isDone);
    })
    .catch(handleError);
};

function deleteTodo(todo){
    // get delete url
    var deleteUrl = 'api/todos/' + todo.data('id');
    // send delete request (no jQuery method for this)
    $.ajax({
        method: 'delete',
        url: deleteUrl
    })
    .then(function(){
        // remove todo from page
        todo.remove();
    })
    .catch(handleError);
};

// --- errors ---
function handleError(err){
    console.log(err)
}