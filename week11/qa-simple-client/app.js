'use strict';

document.addEventListener('DOMContentLoaded', event => {
    console.log("Page loaded");

    document.getElementById('loadbtn').addEventListener('click', async () => {
        // on button click
        try {
            const response = await fetch('http://localhost:3001/api/questions')
            if (response.ok) {
                const questions = await response.json()
                const div = document.getElementById('questionlist')
                div.innerHTML = `<p>We have ${questions.length} questions</p>`
                for (const q of questions) {
                    console.log(q)
                    div.innerHTML += `<p>${q.text}</p>`
                }
            } else {
                console.log('http error code', response.status)
            }
        } catch (e) {
            console.log('Network error')
        }
    })

});  