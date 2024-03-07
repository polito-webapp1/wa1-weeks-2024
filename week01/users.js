// Exercise 2: My Users' List
"use strict";

const users = "Luigi De   Russis,Luca Mannella, Fulvio Corno,  Juan      Pablo Saenz Moreno , Luca Pezzolla"
const userArray = users.split(",");
for(let i =0; i<userArray.length; i++) {
    userArray[i] = userArray[i].trim();
}
console.log(userArray);

const acronyms = [] ;
for (const name of userArray) {

    // alternative: consider using 'split': console.log(name.split(' '));

    let acronym = name[0];

    for(let i = 1; i<name.length; i++) {
         if(name[i] == ' ' && name[i+1] != ' ') {
            acronym = acronym + name[i+1]; 
         }
    }

    acronyms.push(acronym.toUpperCase())
}

console.log(acronyms)
