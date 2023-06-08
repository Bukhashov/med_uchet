const {Schema, model} = require('mongoose');

const report = new Schema({
    fullname:          {type: String},
    group_id:          {type: String},
    title:             {type: String},
});

module.exports = model('reports', report);