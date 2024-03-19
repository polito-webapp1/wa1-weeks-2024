function hi() {
    console.log("hi")
}

let y = 3

console.log("Before")
setTimeout(hi, 0)
setTimeout((x) => {
    console.log(`I'm here, Mr. ${x}`)
    y ++ ;
}, 1000, 'Boss')
setTimeout(()=>{console.log(y)}, 2000)
console.log("After")
console.log(y)
