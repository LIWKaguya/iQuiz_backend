const mongoose = require('mongoose');
const questionImport = require('../models/question');

const { questionSchema } = questionImport

const categorySchema = mongoose.Schema({
    name: String, 
    questions: [questionSchema]
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Category', categorySchema);