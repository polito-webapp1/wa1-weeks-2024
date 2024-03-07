// Exercise 1: Better Scores
"use strict";

const scores = [5, 8, -2, -9, 4, 5, -2, 9] ;
// let  scores = [5, 8, -2, -9, 4, 5, -2, 10] ;
scores[0] = 6 ;
scores.push(-9)
// scores = [...scores, 3] ;

console.log(scores);
console.log(scores.length);

for (const score of scores) {
    console.log(`Your score is ${score}`);
}

// const scores2 = scores ; NO, just a reference, not a copy
const scores3 = [...scores];

// for(let i = 0; i < scores.length; i++) {
//     if(scores3[i]<0) {
//         scores3.splice(i, 1) ;
//         i--;
//     }
// }

const positiveScores = [];
for(const score of scores3) {
    if(score>=0) {
        positiveScores.push(score);
    }
}
const NN = scores3.length - positiveScores.length;
console.log(positiveScores);

// NO becaue sort implmements a string ordering
// positiveScores.sort();
// console.log(positiveScores);

// console.log(scores3);

for(let repeat = 0; repeat<2; repeat++) {
    let posmin = 0 ;
    for(let i=0; i<positiveScores.length; i++) {
        if(positiveScores[i]<positiveScores[posmin]) {
            posmin = i;
        }
    }
    positiveScores.splice(posmin, 1);    
}
console.log(positiveScores);

let avg = 0;
for(const score of positiveScores) {
    avg += score;
}
avg = Math.round(avg / positiveScores.length);

for (let count=0; count<NN+2; count++) {
    positiveScores.push(avg)
}

console.log(positiveScores);