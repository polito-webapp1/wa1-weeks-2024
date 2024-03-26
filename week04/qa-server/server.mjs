import express from 'express'
import morgan from 'morgan'
import { getQuestion } from './dao.mjs'
// import dao from './dao.mjs'
//     dao.getQuestion

const app = express()
app.use(morgan('common'))
app.use(express.json())

app.get('/questions/:id', (req, res)=>{
    const questionId = req.params.id
    getQuestion(questionId).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.listen(3000, ()=>{console.log("Running!")})