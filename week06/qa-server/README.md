# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

3 types of objects: users, questions, answers.

GET /questions
give me the list of all questions in the DB

[
    2, 5, 7, 9
]

[ {id, text, email, date }, {id, text, email, date}]  # full contents of all elements

[ {id, text}, {id, text}, {id, text}] # full list with a subset of the fields

GET /questions/:id
give me the details of one question, with the given id

GET /questions/3
{
    "id": 3,
    "text": "My question",
    "email": "user@example.com",
    "date": "2024-03-26"
}


Add one question
POST /questions

In the request body:
{
    "text": "new question",
    "email": "user@example.com"
}

the server will assing and ID and timestamp it with the current date

In the response body:
{ "id": 77 }
{ "id": 77,
    "text": "new question",
    "email": "user@example.com"
    "date": "2024-03-26"
}


GET /questions/:id/answers 

Input: id of the question (in the URL)
Output in the response body: list of relevant answer object
[ {id, text, email, score, date}, {}, {}]

Add a new answer to a question
POST /questions/:id/answers
Input in the request body:
{ text, email }


GET /users/:id/answers

Modify an answer:
PUT /answers/:id
in the request body: { answer object }
modifies all the fields of the answer object with that id


"UPVOTING" an answer
POST /answer/:id/votes
with an empty request body (or the user email who upvoted)




### __Title__

URL: `/`

HTTP Method: Pick one.

Description: What I do.

Request body:
```
A short example, if any
```

Response: How I reply.

Response body:
```
A short example, if any
```