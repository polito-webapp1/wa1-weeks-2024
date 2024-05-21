const url = "http://localhost:3001/api"

async function loadQuestions() {
    
    const response = await fetch(`${url}/questions`)
    const questions = await response.json()
    return questions

}

export {loadQuestions}