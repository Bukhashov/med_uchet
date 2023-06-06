const {Schema, model} = require('mongoose');

const group = new Schema({
    title:          {type: String},
    admin:          {type: String},
    participants:   {type: Array},
    subject:        {type: String},
});

module.exports = model('groups', group);