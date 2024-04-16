async function hi() {
    return 4

    throw "error"
}

hi().then((res)=>{console.log(res)}).catch((err)=>{})

try {
    const res2 = await hi()
    console.log(res2)
} catch( ex ) {
    // error here
}

function hi2() {
    return new Promise((resolve, reject)=>{
        resolve(4)

        reject("error")
    })
}