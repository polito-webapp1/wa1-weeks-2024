import dayjs from 'dayjs';
import sqlite from 'sqlite3'

const db = new sqlite.Database('questions.sqlite', 
(err)=>{if(err) throw err})

function Answer(id, text, email, date, score = 0) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.score = score;
    this.date = dayjs(date);
  
    this.toString = () => {
      return `${this.email} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
    }
  }

  function Question(id, text, email, date) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.date = dayjs(date);
  
    this.toString = () => {
      return `Question '${this.text}' asked by ${this.email} on ${this.date.format('YYYY-MM-DD')}.`;
    }
  }  

  function QuestionList() {
    this.getQuestion = function(questionId) {
      return new Promise((resolve, reject)=>{
        const sql = `select q.id, q.text, u.email, q.date
        from question q, "user" u
        where q.id = ?
        and q.authorId = u.id `

        db.get(sql, [questionId], (err, row)=> {
          if(err) reject(err)
          else resolve(new Question(row.id, row.text, row.email, dayjs(row.date)))
        })

      })
    }

    this.getUserId = function(email) {
      return new Promise((resolve, reject)=>{
        const sql = `select u.id 
        from "user" u 
        where u.email = ?`
        db.get(sql, [email], (err, row)=>{
          if(err)
            reject(err)
          else
            resolve(Number(row.id))
        })
      })
    }

    this.addQuestion = function(q) {

      const userEmail = q.email

      const userIdPromise = this.getUserId(userEmail)

      return userIdPromise.then((userId)=>{
        return new Promise((resolve, reject)=>{
          const sql = `insert into question(id, text, authorId, date)
             values(?, ?, ?, ?)`

             db.run(sql, [q.id, q.text, userId, q.date.format('YYYY-MM-DD')],
             (err) => {
               if (err) reject(err) 
               else resolve()
             })         
        })
      })
      
    }
  }

  const qlist = new QuestionList()
  const q1 = qlist.getQuestion(1)
  q1.then((q)=>{console.log(q.toString())})

  const q2 = new Question(5, 'Does it work?', 'luca.mannella@polito.it', dayjs())
  qlist.addQuestion(q2).then(()=>{console.log("Question added")})