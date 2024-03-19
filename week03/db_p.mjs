import sqlite from 'sqlite3'

const db = new sqlite.Database('questions.sqlite', 
(err)=>{if(err) throw err})

const users = new Promise((resolve, reject)=>{
    db.all("select * from user", (err, rows)=>{
        if (err)
            reject(err)
        else
            resolve(rows)
    })
}) ;


function get_users() {
    return new Promise((resolve, reject)=>{
        db.all("select * from user", (err, rows)=>{
            if (err)
                reject(err)
            else
                resolve(rows)
        })
    }) ;
}

console.log(users)

users.then( (rows)=> {
    console.log(rows)
}).catch( (err)=>{
    console.log("Error", err)
})


get_users().then((rows)=>{console.log(rows.length)})

