const {Schema, model} = require('mongoose')

const schema = new Schema({
    owner: {type: 'ObjectId', ref: 'User'},
    value: {type: String, required: true, unique: true},
    isDone: {type: Boolean, required: true},
    isImportant: {type: Boolean, required: true}
})

module.exports= model('Task', schema)