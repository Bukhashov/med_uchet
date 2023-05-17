const {Schema, model} = require('mongoose');

const group = new Schema({
    title:          {type: String},
    admin:          {type: String},
    participants:   {type: Array}
});

module.exports = model('groups', group);