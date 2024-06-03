import { Answer } from "../QAModels.mjs";

const url = "http://localhost:3001/api"

async function loadQuestions() {

    try {
        const response = await fetch(`${url}/questions`)

        if (!response.ok) {
            throw new Error("In loadQuestions: invalid response code " + response.status);
        }

        const questions = await response.json()
        return questions
    } catch (ex) {
        throw new Error("In loadQuestions: " + ex);
    }
}

async function loadAnswers(qid) {
    try {
        const response = await fetch(`${url}/questions/${qid}/answers`)

        if (!response.ok) {
            throw new Error("In loadAnswers: invalid response code " + response.status);
        }

        let answers = await response.json()
        answers = answers.map((a) => new Answer(a.id, a.text, a.email, a.date, a.score))
        return answers
    } catch (ex) {
        throw new Error("In loadAnswers: " + ex);
    }
}

async function upVoteAnswer(aid) {
    try {
        const response = await fetch(`${url}/answers/${aid}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vote: 'upvote' })
        });
        if (!response.ok) {
            throw new Error("In upVoteAnswer: invalid response code " + response.status);
        }

    } catch (ex) {
        throw new Error("In upVoteAnswer: " + ex);
    }
}

async function deleteAnswer(aid) {
    try {
        const response = await fetch(`${url}/answers/${aid}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("In upVoteAnswer: invalid response code " + response.status);
        }

    } catch (ex) {
        throw new Error("In upVoteAnswer: " + ex);
    }
}

async function addAnswer(qid, answer) {
    let response;
    try {
        response = await fetch(`${url}/questions/${qid}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: answer.text,
                email: answer.email,
                date: answer.date,
                score: 0
            })
        })
    } catch (ex) {
        throw new Error("In addAnswer: " + ex);
    }
    if (!response.ok) {
        throw new Error("In addAnswer: invalid response code " + response.status + " " + await response.text());
    }
}

async function updateAnswer(answer) {
    let response;
    try {
        response = await fetch(`${url}/answers/${answer.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: answer.text,
                email: answer.email,
                date: answer.date,
                score: answer.score
            })
        })
    } catch (ex) {
        throw new Error("In updateAnswer: " + ex);
    }
    if (!response.ok) {
        throw new Error("In updateAnswer: invalid response code " + response.status + " " + await response.text());
    }
}



export { loadQuestions, loadAnswers, upVoteAnswer, deleteAnswer, addAnswer, updateAnswer }