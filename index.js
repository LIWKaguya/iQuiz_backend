const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.use(express.json());
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
  
app.use(requestLogger)

let questions = [
    {
        id: 1,
        title: 'is this correct?',
        options: [
            {
                text: 'no',
                isCorrect: false
            },
            {
                text: 'no',
                isCorrect: false
            },
            {
                text: 'yes',
                isCorrect: true
            },
            {
                text: 'no',
                isCorrect: false
            }
        ]
    },
    {
        id: 2,
        title: 'Is this the good one',
        options: [
            {
                text: 'no',
                isCorrect: false
            },
            {
                text: 'no',
                isCorrect: false
            },
            {
                text: 'yes',
                isCorrect: true
            },
            {
                text: 'no',
                isCorrect: false
            }
        ]
    },
]

app.get('/', (req, res) => {
    res.send('this is working')
});

app.get('/api/questions', (req, res) => {
    res.json(questions);
});

app.get('/api/questions/:id', (req, res) => {
    const id = Number(req.params.id);
    const question = questions.find(q => q.id === id);
    
    if(question) {
        res.json(question);
    } else {
        res.status(404).end(); 
    }
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})