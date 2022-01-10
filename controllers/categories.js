const categoriesRouter = require('express').Router()
const Category = require('../models/category');
const {Question} = require('../models/question');

categoriesRouter.get('/', async (req, res) => {
    const categories = await Category.find({});
    res.json(categories.map(cate => cate.toJSON()));
})

categoriesRouter.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(category) {
        res.json(category.toJSON());
    } else {
        res.status(404).end(); 
    }
});

categoriesRouter.post('/', async (req, res) => {
    const { body } = req

    const category = new Category({
        name: body.name,
        questions: body.questions
    })

    const savedCategory = await category.save();

    savedCategory.questions.forEach( async (question) => {
        const newQuestion = new Question({
            title: question.title,
            options: question.options
        });
        await newQuestion.save();
    })

    res.json(savedCategory.toJSON());
})

module.exports = categoriesRouter;