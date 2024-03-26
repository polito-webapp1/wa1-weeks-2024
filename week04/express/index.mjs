import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Hello there!!')
})

app.listen(3000, [morgan('tiny')], ()=>{console.log('Application started')})