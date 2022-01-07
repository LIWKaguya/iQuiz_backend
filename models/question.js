const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
    text: String,
    isCorrect: Boolean
})

const questionSchema = mongoose.Schema({
    title: String,
    options: [optionSchema]
})

questionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = questionSchema