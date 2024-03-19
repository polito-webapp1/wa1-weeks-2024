import sqlite from 'sqlite3'

const db = new sqlite.Database('questions.sqlite', 
(err)=>{if(err) throw err})

db.each("SELECT * FROM user", (err, row) => {
    if(err)
        throw err ;

    console.log(row.id, row.name)

})

db.all("SELECT * FROM user", (err, rows) => {
    if(err) 
        throw err ;

    // console.log(rows);
    rows.forEach((r)=>{console.log(r.name)})
});

function get_users(callback) {
    db.all("SELECT * FROM user", (err, rows) => {
        if(err) 
            callback(err)
        else
            callback(none, rows)
    });
}

get_users((err, rows)=>{
    console.log(rows.length)
})

const userId = 3

db.get("SELECT * FROM user WHERE id=?", [userId], (err, row)=>{
    console.log(`USER ${userId} IS `, row.name)
})

// db.close()