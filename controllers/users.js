const usersRouter = require('express').Router()
const User = require('../models/user');
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map(u => u.toJSON()));
});

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.json(user.toJSON());
    } else {
        res.status(404).end(); 
    }
});

usersRouter.post('/', async (req, res) => {
    const { body } = req;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        email: body.email,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save();

    res.json(savedUser);
})

module.exports = usersRouter

