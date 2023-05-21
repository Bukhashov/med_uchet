const {Schema, model} = require('mongoose');

const todo = new Schema({
    title:       {type: String},
    group:       {type: String},
});

module.exports = model('todo', todo);