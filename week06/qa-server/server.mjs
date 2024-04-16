import express from 'express'
import morgan from 'morgan'
import dayjs from 'dayjs';

import { getQuestion, addQuestion } from './dao.mjs'

const app = express()
app.use(morgan('common'))
app.use(express.json())

app.get('/questions/:id', (req, res) => {
    const questionId = req.params.id
    getQuestion(questionId).then((q) => {
        res.json(q)
    }).catch((err) => {
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.post('/questions',  async (req, res)=>{
    const question = req.body 
    console.log(question)

    question.date = dayjs() // now

    try {
        const id = await addQuestion(question)
        res.json({id: id})
    } catch(ex) {
        res.status(500).json(ex)
    }
})

app.listen(3000, () => { console.log("Running!") })