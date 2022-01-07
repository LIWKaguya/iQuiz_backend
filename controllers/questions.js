const questionsRouter = require('express').Router();
const Question = require('../models/question');

questionsRouter.get('/', async (req, res) => {
    const questions = await Question.find({})
    res.json(questions.map(q => q.toJSON()));
});

questionsRouter.get('/:id', async (req, res) => {
    const question = await Question.findById(req.params.id);
    if(question) {
        res.json(question.toJSON());
    } else {
        res.status(404).end(); 
    }
});

questionsRouter.post('/', async (req, res) => {
    const { body } = req

    const question = new Question({
        title: body.title,
        options: body.options
    })

    const savedQuestion = await question.save();

    res.json(savedQuestion.toJSON())
})


module.exports = questionsRouter;